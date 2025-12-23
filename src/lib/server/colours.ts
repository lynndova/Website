import { building } from '$app/environment';
import { fetchReleases, grabToHex } from '$lib';
import type { Release, ReleasePalette } from '$lib/types';
import colour from 'colorthief';

const releases = await fetchReleases();

export const releaseColours: { [key: string]: ReleasePalette } = {};

for (const release of releases) {
	const metadata: Release = release.metadata;

	const palette: ReleasePalette = {
		slug: metadata.slug,
		primary: metadata.colour,
		secondary: grabToHex(await colour.getColor('./static' + metadata.icon)),
		palette: (await colour.getPalette('./static' + metadata.icon)).map((colour) =>
			grabToHex(colour)
		)
	};

	console.log(release.metadata.slug);

	releaseColours[metadata.slug] = palette;
}
