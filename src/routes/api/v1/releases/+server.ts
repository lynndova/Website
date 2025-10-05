import { fetchReleases } from '$lib';
import { json } from '@sveltejs/kit';

export async function GET() {
	const releases = await fetchReleases();
	const releasesMetadata = releases.map((e) => e.metadata);
	return json(releasesMetadata);
}
