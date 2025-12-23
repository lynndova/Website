import type { GrabbedColour } from 'colorthief';

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

export type ReleasePalette = {
	slug: string;
	primary: HexColour;
	secondary: HexColour;
	palette: HexColour[];
};
