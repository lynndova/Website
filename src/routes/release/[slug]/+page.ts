import type { MetaTagsProps } from 'svelte-meta-tags';

export async function load({ url, data }) {
	const pathEdited = data.release.path.replace('src/content/releases/', '');
	const postFile = await import(
		`../../../content/releases/${pathEdited.split('.').slice(0, -1).join('.')}.${pathEdited.split('.').slice(-1).join('.')}`
	);
	const content = postFile.default;
	const pageMetaTags = Object.freeze({
		title: data.release.metadata.title,
		description: data.release.metadata.summary,
		openGraph: {
			images: [
				{
					url: new URL(data.release.metadata.icon, url.origin).href
				}
			]
		}
	} satisfies MetaTagsProps);

	return {
		pageMetaTags,
		metadata: data.release.metadata,
		content,
		embeds: data.embeds,
		colours: JSON.parse(data.colours)
	};
}
