import { fetchReleases } from '$lib';
import type { Embed, Link, Release } from '$lib/types';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
	const requestedSlug = params.slug;
	const releases = await fetchReleases();

	const requestedRelease = releases.find((release) => release.metadata.slug === requestedSlug);
	if (requestedRelease === undefined)
		error(404, {
			message: 'Release not found'
		});

	const metadata: Release = requestedRelease.metadata;

	const embeds: Embed[] = [];

	// Bandcamp Embeds
	const bcUrl = metadata.links.find((link: Link) => link.name.toLowerCase() === 'bandcamp');
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
	const ytUrl = metadata.links.find((link: Link) => link.name.toLowerCase() === 'youtube');
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

	return { embeds, requestedRelease, metadata };
}
