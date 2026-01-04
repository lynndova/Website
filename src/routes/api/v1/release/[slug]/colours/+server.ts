import { fetchReleases } from '$lib';
import { getColours } from '$lib/server/colours';
import { json, error } from '@sveltejs/kit';

export async function GET({ params, fetch }) {
	const requestedSlug = params.slug;
	const releases = await fetchReleases();

	const requestedRelease = releases.find((release) => release.metadata.slug === requestedSlug);
	if (requestedRelease === undefined)
		error(404, {
			message: 'Release not found'
		});

	const colours = await getColours();
	return json(colours[requestedRelease.metadata.slug]);
}
