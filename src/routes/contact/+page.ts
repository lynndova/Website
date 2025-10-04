import type { MetaTagsProps } from 'svelte-meta-tags';

export async function load() {
	const pageMetaTags = Object.freeze({
		title: 'contact'
	} satisfies MetaTagsProps);

	return {
		pageMetaTags
	};
}
