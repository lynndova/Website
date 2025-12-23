import type { GrabbedColour } from 'colorthief';
import type { HexColour } from './types';
import { building, dev } from '$app/environment';

export const formatDateTime = (time: Date) => {
	const TIME_FORMAT = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeStyle: 'short' });
	return TIME_FORMAT.format(time);
};

export const formatDate = (time: Date) => {
	const TIME_FORMAT = new Intl.DateTimeFormat('en-US', {
		dateStyle: 'long',
		timeZone: 'Europe/London'
	});
	return TIME_FORMAT.format(time);
};

export function getImageBlob(data: string) {
	const imageByteString = atob(data);
	const imageArrayBuffer = new ArrayBuffer(imageByteString.length);
	const imageIntArray = new Uint8Array(imageArrayBuffer);
	for (let i = 0; i < imageByteString.length; i++) {
		imageIntArray[i] = imageByteString.charCodeAt(i);
	}
	const imageBlob = new Blob([imageIntArray], { type: 'image/png' });

	return imageBlob;
}

export async function fetchReleases() {
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

// https://stackoverflow.com/a/5624139
export function grabToHex(colour: GrabbedColour) {
	return ('#' +
		((1 << 24) | (colour[0] << 16) | (colour[1] << 8) | colour[2])
			.toString(16)
			.slice(1)) as HexColour;
}

export function getStaticRoot() {
	// THIS IS SUCH CURSED
	const fullPath = new URL(import.meta.url).pathname;
	const root = (dev ? fullPath.split('/src') : fullPath.split('/.svelte-kit/output'))[0];
	console.log(root);
	return dev || building ? './static' : root + '/.svelte-kit/output/client';
}
