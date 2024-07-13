import { browser } from '$app/environment';
import type { Link } from '../types/links';
import uuidv4 from '../utils/uuid';
import db from './firebase';
import { collection, doc, setDoc, query, where, getDocs } from "firebase/firestore"; 

export default class LinkData {
	links: Link[] = [];
	sortOrder: 'asc' | 'desc' = 'asc';

	constructor() {
		if (browser) {
			this.links = JSON.parse(localStorage.getItem('links') ?? '[]') as Link[];
			this.links.sort((a, b) => b.views - a.views);
		}
		this.syncViewsWithFirebase();
	}

	async addLink(linkUrl: string, linkAlias: string) {
		const link: Link = {
			url: linkUrl,
			alias: linkAlias,
			views: 0,
			uuid: uuidv4()
		};

		try {
			// verify that the alias is unique
			const querySnapshot = query(collection(db, "links"), where("alias", "==", linkAlias));
			const querySnapshotData = await getDocs(querySnapshot);
			if (querySnapshotData.size > 0) {
				throw new Error('Alias already exists');
			}

			await setDoc(doc(db, "links", link.uuid), link);
		} catch (error) {
			throw new Error(`${error}`);
		}

		this.links = [...this.links, link];

		if (browser) {
			this.links.sort((a, b) => b.views - a.views);
			localStorage.setItem('links', JSON.stringify(this.links));
		}
		return link;
	}

	async syncViewsWithFirebase() {
		if (this.links.length === 0) return;

		let aliasArray = this.links.map(link => link.alias);

		const querySnapshot = query(collection(db, 'links'), where('alias', 'in', aliasArray));
		const querySnapshotData = await getDocs(querySnapshot);

		querySnapshotData.forEach(async doc => {
			const link = doc.data() as Link;
			for (let localLinkId in this.links) {
				let localLink = this.links[localLinkId];
				if (localLink.alias === link.alias) {
					this.links[localLinkId].views = link.views;
				}
			}
		});

		if (browser) {
			this.links.sort((a, b) => b.views - a.views);
			localStorage.setItem('links', JSON.stringify(this.links));
		}
	}
}
