import { fetchReleases } from '$lib';
import type { ReleasePalette } from '$lib/types';
import { Vibrant } from 'node-vibrant/node';

let colours: { [key: string]: ReleasePalette } | null = null;

const releases = await fetchReleases();
async function genColours() {
	colours = {};
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

export async function getColours() {
	if (colours === null) {
		return await genColours();
	}
	return colours;
}

/*async function getReleaseColours() {
	const colours: { [key: string]: ReleasePalette } = {};
	for (const release of releases) {
		const metadata = release.metadata;

		const palette: ReleasePalette = {
			slug: metadata.slug,
			primary: metadata.colour,
			secondary: grabToHex(await colour.getColor(getStaticRoot() + metadata.icon)),
			palette: (await colour.getPalette(getStaticRoot() + metadata.icon)).map((colour) =>
				grabToHex(colour)
			)
		};

		console.log(release.metadata.slug);

		colours[metadata.slug] = palette;
	}

	return colours;
}*/
