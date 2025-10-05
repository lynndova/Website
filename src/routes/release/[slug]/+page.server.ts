import { fetchReleases } from '$lib';
import type { Embed, Link, Release } from '$lib/types';
import { error } from '@sveltejs/kit';
import bcfetch from 'bandcamp-fetch';

export async function load({ params }) {
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
		const albumAPI = bcfetch.album;
		const albumData = await albumAPI.getInfo({
			albumUrl: bcUrl.to
		});

		if (albumData.id) {
			embeds.push({
				type: 'bandcamp',
				id: albumData.id.toString(),
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
