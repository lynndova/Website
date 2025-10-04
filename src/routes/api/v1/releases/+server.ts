import { fetchReleases } from '$lib';
import { json } from '@sveltejs/kit';

export async function GET() {
	const releases = await fetchReleases();
	return json(releases);
}
