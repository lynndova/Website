import type { MetaTagsProps } from 'svelte-meta-tags';

export async function load() {
	const pageMetaTags = Object.freeze({
		title: 'use my music'
	} satisfies MetaTagsProps);

	return {
		pageMetaTags
	};
}
