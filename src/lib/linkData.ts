import { browser } from '$app/environment';
import type { Link } from '../types/links';

export default class LinkData {
	links: Link[] = [];

	constructor() {
		if (browser) {
			this.links = JSON.parse(localStorage.getItem('links') ?? '[]') as Link[];
		}
	}

	addLink(linkAlias: string, linkUrl: string) {
		const link: Link = {
			url: linkUrl,
			alias: linkAlias,
			views: 0,
			uuid: Math.random().toString(36).substring(2, 7)
		};

		this.links.push(link);
		if (browser) {
			localStorage.setItem('links', JSON.stringify(this.links));
		}
		return link;
	}
}
