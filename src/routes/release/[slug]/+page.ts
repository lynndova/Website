import type { MetaTagsProps } from 'svelte-meta-tags';

export async function load({ url, data }) {
	const postFile = await import(`../../../content/releases/${data.requestedRelease.path}.md`);
	const content = postFile.default;
	const pageMetaTags = Object.freeze({
		title: data.metadata.title,
		description: data.metadata.summary,
		openGraph: {
			images: [
				{
					url: new URL(data.metadata.icon, url.origin).href
				}
			]
		}
	} satisfies MetaTagsProps);

	return {
		pageMetaTags,
		metadata: data.metadata,
		content,
		embeds: data.embeds,
		colours: data.colours
	};
}
