import type { Release } from '$lib/types';
import { json } from '@sveltejs/kit';

async function getReleases() {
	let posts: Release[] = [];

	const paths = import.meta.glob('/src/releases/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Release, 'slug'>;
			const post = { ...metadata, slug } satisfies Release;
			posts.push(post);
		}
	}

	posts = posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	return posts;
}

export async function GET() {
	const releases = getReleases();
	return json(releases);
}
