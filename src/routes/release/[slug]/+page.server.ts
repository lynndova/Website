import type { Embed, Link, ReleaseContainer } from '$lib/types';
import { error } from '@sveltejs/kit';
import colours from '$lib/colours.json';
import releases from '$lib/releases.json';

export async function load({ params, fetch }) {
	const requestedSlug = params.slug;

	const requestedRelease = releases.find((release) => release.metadata.slug === requestedSlug) as
		| ReleaseContainer
		| undefined;
	if (requestedRelease === undefined)
		error(404, {
			message: 'Release not found'
		});

	const embeds: Embed[] = [];

	// Bandcamp Embeds
	const bcUrl = requestedRelease.metadata.links.find(
		(link: Link) => link.name.toLowerCase() === 'bandcamp'
	);
	if (bcUrl !== undefined) {
		const bcResponse = await fetch(bcUrl.to, {
			headers: {
				'Access-Control-Allow-Origin': 'lynndova.com'
			}
		});
		const bcText = await bcResponse.text();
		const albumIdRegex = /(?<=<!-- (album|track) id )(.*)(?= -->)/;
		const albumId = albumIdRegex.exec(bcText)?.[0];

		if (albumId) {
			embeds.push({
				type: 'bandcamp',
				id: albumId,
				source: bcUrl
			});
		}
	}

	// YouTube Embeds
	const ytUrl = requestedRelease.metadata.links.find(
		(link: Link) => link.name.toLowerCase() === 'youtube'
	);
	if (ytUrl !== undefined) {
		const ytRegex =
			/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*?[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;

		const ytRegexRun = ytRegex.exec(ytUrl.to);
		if (ytRegexRun && ytRegexRun[1]) {
			const ytId = ytRegexRun[1];
			embeds.push({
				type: 'youtube',
				id: ytId,
				source: ytUrl
			});
		}
	}

	return {
		embeds,
		release: requestedRelease,
		colours: JSON.stringify(colours)
	};
}
