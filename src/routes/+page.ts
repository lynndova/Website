import type { MetaTagsProps } from 'svelte-meta-tags';

export const load = async () => {
	const pageMetaTags = Object.freeze({
		title: 'home'
	} satisfies MetaTagsProps);

	return {
		pageMetaTags
	};
};
