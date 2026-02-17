import releases from '$lib/releases.json';
import type { ReleaseContainer } from '$lib/types';
import type { MetaTagsProps } from 'svelte-meta-tags';

export const load = async () => {
	const pageMetaTags = Object.freeze({
		title: 'home'
	} satisfies MetaTagsProps);

	return {
		pageMetaTags,
		releases: releases as ReleaseContainer[]
	};
};
