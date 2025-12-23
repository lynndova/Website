import { fetchReleases, grabToHex } from '$lib';
import type { ReleasePalette } from '$lib/types';
import colour from 'colorthief';

async function getReleaseColours() {
	const colours: { [key: string]: ReleasePalette } = {};
	for (const release of releases) {
		const metadata = release.metadata;

		const palette: ReleasePalette = {
			slug: metadata.slug,
			primary: metadata.colour,
			secondary: grabToHex(await colour.getColor('./static' + metadata.icon)),
			palette: (await colour.getPalette('./static' + metadata.icon)).map((colour) =>
				grabToHex(colour)
			)
		};

		console.log(release.metadata.slug);

		colours[metadata.slug] = palette;
	}

	return colours;
}

const releases = await fetchReleases();
export const releaseColours = await getReleaseColours();
