import type { Release } from '$lib/types.js';
import type { MetaTagsProps } from 'svelte-meta-tags';
import ColorThief, { type RGBColor } from 'colorthief';

export async function load({ params, url }) {
	const release = await import(`../../../content/releases/${params.slug}.md`);
	const metadata: Release = release.metadata;
	const content = release.default;
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
