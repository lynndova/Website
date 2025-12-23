import { fetchReleases, grabToHex } from '$lib';
import { releaseColours } from '$lib/server/colours';
import type { Release, ReleasePalette } from '$lib/types';
import type { ServerInit } from '@sveltejs/kit';
import colour from 'colorthief';

export const init: ServerInit = async () => {
	const releases = await fetchReleases();

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

		releaseColours[metadata.slug] = palette;
	}
};
