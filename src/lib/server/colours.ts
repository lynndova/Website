import { fetchReleases } from '$lib';
import type { ReleasePalette } from '$lib/types';
import { Vibrant } from 'node-vibrant/node';

const releases = await fetchReleases();

export async function generateColours() {
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
