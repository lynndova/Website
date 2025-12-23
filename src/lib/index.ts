import type { GrabbedColour } from 'colorthief';
import type { HexColour, ReleasePalette } from './types';
import { dev } from '$app/environment';

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
	const allReleaseFiles = import.meta.glob('/src/content/releases/*.md');
	const iterableFiles = Object.entries(allReleaseFiles);
	const allReleases = await Promise.all(
		iterableFiles.map(async ([path, resolver]) => {
			const { metadata } = (await resolver()) as any;
			const releasePath = path.slice(22, -3);
			if (metadata.slug === undefined) metadata.slug = releasePath;
			return {
				metadata,
				path: releasePath
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
	return dev ? './static' : '/';
}
