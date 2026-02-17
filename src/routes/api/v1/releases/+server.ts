import { json } from '@sveltejs/kit';
import releases from '$lib/releases.json';

export async function GET() {
	const releasesMetadata = releases.map((e) => e.metadata);
	return json(releasesMetadata);
}
