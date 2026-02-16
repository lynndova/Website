import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type Plugin } from 'vite';

import fs from 'node:fs';
import path from 'node:path';

export async function getReleases() {
	const allReleaseFiles = import.meta.glob('/src/content/releases/*.{md,mdx}');
	const iterableFiles = Object.entries(allReleaseFiles);
	const allReleases = await Promise.all(
		iterableFiles.map(async ([path, resolver]) => {
			const { metadata } = (await resolver()) as any;
			const pathRegex = /^(.+)\/([^\/]+)$/;
			const releasePathTest = pathRegex.exec(path);
			const fileName = releasePathTest && releasePathTest[2] ? releasePathTest[2] : path;
			const isProvidedSlugPath = (pathRegex.exec(metadata.slug)?.length ?? 0) > 0;
			if (metadata.slug === undefined || isProvidedSlugPath)
				metadata.slug = fileName.split('.').slice(0, -1).join('.');
			return {
				metadata,
				path: fileName
			};
		})
	);

	return allReleases;
}

export const genDataPlugin: Plugin = {
	name: 'lynndova-gendata',
	async generateBundle() {
		const testContent = 'lynn says hi';
		const releases = await getReleases();
		const colours = {
			test: 'hi',
			test2: 'hi2'
		};

		const testLocation = path.resolve('./static/test.txt');

		fs.writeFile(testLocation, testContent, {}, () => {
			console.log(`Generated test file in ${testLocation}`);
		});

		const releasesLocation = path.resolve('./src/lib/releases.json');

		fs.writeFile(releasesLocation, JSON.stringify(releases), {}, () => {
			console.log(`Generated ${Object.keys(colours).length} releases to ${location}`);
		});

		const coloursLocation = path.resolve('./src/lib/colours.json');

		fs.writeFile(coloursLocation, JSON.stringify(colours), {}, () => {
			console.log(`Generated ${Object.keys(colours).length} colours to ${location}`);
		});
	}
};

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), genDataPlugin],
	resolve: {
		alias: {
			fs: 'node:fs',
			path: 'node:path',
			util: 'node:util',
			stream: 'node:stream',
			zlib: 'node:zlib',
			assert: 'node:assert'
		}
	}
});
