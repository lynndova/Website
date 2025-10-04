import type { Release } from '$lib/types.js';
import type { MetaTagsProps } from 'svelte-meta-tags';
import ColorThief, { type RGBColor } from 'colorthief';
import { fetchReleases } from '$lib';
import { error } from '@sveltejs/kit';

export async function load({ params, url }) {
	const requestedSlug = params.slug;
	const releases = await fetchReleases();

	const requestedRelease = releases.find((release) => release.metadata.slug === requestedSlug);
	if (requestedRelease === undefined)
		error(404, {
			message: 'Release not found'
		});

	const metadata: Release = requestedRelease.metadata;
	const postFile = await import(`../../../content/releases/${requestedRelease.path}.md`);
	const content = postFile.default;
	const pageMetaTags = Object.freeze({
		title: metadata.title,
		description: metadata.summary,
		openGraph: {
			images: [
				{
					url: new URL(metadata.icon, url.origin).href
				}
			]
		}
	} satisfies MetaTagsProps);

	return {
		pageMetaTags,
		metadata,
		content
	};
}
