import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type Plugin } from 'vite';

import fs from 'node:fs';
import path from 'node:path';
import { glob } from 'glob/raw';
import fm from 'front-matter';
import type { Release, ReleaseContainer, ReleasePalette } from '$lib/types';
import { Vibrant } from 'node-vibrant/node';

async function generateReleases() {
	const allReleaseFiles = await glob('./src/content/releases/*.{md,mdx}');

	const iterableFiles = Object.entries(allReleaseFiles);
	const allReleases = await Promise.all(
		iterableFiles.map(async ([key, path]) => {
			const contents = fs.readFileSync(path, {});
			if (!fm.test(contents.toString())) return;
			const parsedDocument = fm(contents.toString());
			const releaseAttributes = parsedDocument.attributes as Release;

			const safePath = path.replaceAll('\\', '\/');
			const pathRegex = /^(.+)\/([^\/]+)$/;
			const releasePathTest = pathRegex.exec(safePath);
			const fileName = releasePathTest && releasePathTest[2] ? releasePathTest[2] : safePath;
			const isProvidedSlugPath = (pathRegex.exec(releaseAttributes.slug)?.length ?? 0) > 0;
			if (releaseAttributes.slug === undefined || isProvidedSlugPath)
				releaseAttributes.slug = fileName.split('.').slice(0, -1).join('.');

			return {
				metadata: releaseAttributes,
				path: safePath,
				body: parsedDocument.body
			};
		})
	);

	return allReleases;
}

async function generateColours(releases: ReleaseContainer[]) {
	let colours: { [key: string]: ReleasePalette } = {};
	for (const release of releases) {
		const colourPalette = await Vibrant.from(
			`https://lynndova.com${release.metadata.icon}`
		).getPalette();

		colours[release.metadata.slug] = {
			slug: release.metadata.slug,
			palette: colourPalette
		};
	}
	return colours;
}

export const lynndovaDatagenPlugin: Plugin = {
	name: 'lynndova-datagen',
	async buildEnd() {
		const testContent = 'lynn says hi';
		const releases = await generateReleases();
		const colours = await generateColours(releases as ReleaseContainer[]);

		const testLocation = path.resolve('./static/test.txt');
		fs.writeFile(testLocation, testContent, {}, () => {
			console.log(`Generated test file in ${testLocation}`);
		});

		const releasesLocation = path.resolve('./src/lib/releases.json');
		fs.writeFile(releasesLocation, JSON.stringify(releases), {}, () => {
			console.log(`Generated ${Object.keys(releases).length} releases to ${releasesLocation}`);
		});
		const coloursLocation = path.resolve('./src/lib/colours.json');
		fs.writeFile(coloursLocation, JSON.stringify(colours), {}, () => {
			console.log(`Generated ${Object.keys(colours).length} colours to ${coloursLocation}`);
		});
	}
};

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), lynndovaDatagenPlugin],
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
