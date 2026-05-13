import { Feed } from 'feed';
import releases from '$lib/releases.json';
import type { Release, ReleaseContainer } from '$lib/types.js';
import { error, text } from '@sveltejs/kit';

export async function GET({ params }) {
	const formats = ['rss', 'atom', 'json'];
	const requestedFormat = params.format;

	if (!formats.includes(requestedFormat))
		return error(400, { message: `Invalid feed format: please use ${JSON.stringify(formats)}` });

	const feed = new Feed({
		title: 'lynndova Releases',
		description: 'Music releases from lynndova',
		id: 'https://lynndova.com/',
		link: 'https://lynndova.com',
		language: 'en',
		image: 'https://lynndova.com/img/lynndova.png',
		favicon: 'https://lynndova.com/favicon.ico',
		copyright: 'All Rights Reserved (2026), lynndova',
		updated: new Date('2026-05-12'),
		generator: 'https://lynndova.com',
		feedLinks: {
			json: 'https://lynndova.com/api/v1/feed/json',
			atom: 'https://lynndova.com/api/v1/feed/atom',
			rss: 'https://lynndova.com/api/v1/feed/rss'
		},
		author: {
			name: 'lynndova',
			link: 'https://lynndova.com'
		}
	});

	releases.forEach((release) => {
		feed.addItem({
			title: release.metadata.title,
			id: `https://lynndova.com/release/${release.metadata.slug}`,
			link: `https://lynndova.com/release/${release.metadata.slug}`,
			description: release.metadata.summary,
			content: release.body,
			author: [
				{
					name: 'lynndova',
					link: 'https://lynndova.com'
				}
			],
			date: new Date(release.metadata.date),
			image: `https://lynndova.com${release.metadata.icon}`
		});
	});

	feed.addCategory('Music');

	switch (requestedFormat) {
		case 'atom':
			return text(feed.atom1());
		case 'json':
			return text(feed.json1());
		default:
			return text(feed.rss2());
	}
}
