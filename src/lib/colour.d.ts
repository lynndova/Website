declare module 'colorthief' {
	export type GrabbedColour = [number, number, number];

	export function getColor(img: string, quality?: number) {
		return Promise<GrabbedColour>();
	}
	export function getPalette(
		img: string,
		colorCount?: number,
		quality?: number
	): Promise<GrabbedColour[]> {
		return Promise<GrabbedColour[]>();
	}
}
