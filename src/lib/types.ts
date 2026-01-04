import type { Palette } from '@vibrant/color';

export type Release = {
	title: string;
	slug: string;
	icon: string;
	date: string;
	summary: string;
	colour: HexColour;
	links: Link[];
};

export type Link = {
	name: string;
	to: string;
};

export type Embed = {
	type: 'youtube' | 'bandcamp';
	id: string;
	source: Link;
};

export type HexColour = `#${string}`;
export type RGBColour = [number, number, number];

export type ReleasePalette = {
	slug: string;
	palette: Palette;
};

export type IncompleteNodeVibrantPalette = {
	Vibrant: {
		rgb: RGBColour;
		population: number;
	};
	DarkVibrant: {
		rgb: RGBColour;
		population: number;
	};
	LightVibrant: {
		rgb: RGBColour;
		population: number;
	};
	Muted: {
		rgb: RGBColour;
		population: number;
	};
	DarkMuted: {
		rgb: RGBColour;
		population: number;
	};
	LightMuted: {
		rgb: RGBColour;
		population: number;
	};
};
