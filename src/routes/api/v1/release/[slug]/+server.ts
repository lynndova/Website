import { json, error } from '@sveltejs/kit';
import colours from '$lib/colours.json';
import releases from '$lib/releases.json';

export async function GET({ params }) {
	const requestedSlug = params.slug;

	const requestedRelease = releases.find((release) => release.metadata.slug === requestedSlug);
	if (requestedRelease === undefined)
		error(404, {
			message: 'Release not found'
		});

	return json({
		metadata: requestedRelease.metadata,
		body: requestedRelease.body,
		// @ts-ignore
		colours: colours[requestedRelease.metadata.slug]
	});
}
