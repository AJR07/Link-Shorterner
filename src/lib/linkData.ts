import { browser } from '$app/environment';
import type { Link } from '../types/links';
import uuidv4 from '../utils/uuid';
import db from './firebase';
import { collection, addDoc, doc, setDoc, getDoc, query, where, getDocs } from "firebase/firestore"; 

export default class LinkData {
	links: Link[] = [];

	constructor() {
		if (browser) {
			this.links = JSON.parse(localStorage.getItem('links') ?? '[]') as Link[];
		}
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
			localStorage.setItem('links', JSON.stringify(this.links));
		}
		return link;
	}
}
