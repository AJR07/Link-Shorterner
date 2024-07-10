import { browser } from '$app/environment';
import type { Link } from '../types/links';

export default class LinkData {
	links: Link[] = [];

	constructor() {
		if (browser) {
			this.links = JSON.parse(localStorage.getItem('links') ?? '[]') as Link[];
		}
	}

	addLink(linkUrl: string, linkAlias: string) {
		const link: Link = {
			url: linkUrl,
			alias: linkAlias,
			views: 0,
			uuid: Math.random().toString(36).substring(2, 7)
		};

		this.links = [...this.links, link];

		if (browser) {
			localStorage.setItem('links', JSON.stringify(this.links));
		}
		return link;
	}
}
