import type { ServerInit } from '@sveltejs/kit';
import path from 'node:path';
import fs from 'node:fs';
import { generateColours } from '$lib/server/colours';

export const init: ServerInit = async () => {
	const location = path.resolve('./src/lib/colours.json');
	const colours = await generateColours();

	fs.writeFile(location, JSON.stringify(colours), {}, () => {
		console.log(`Generated ${Object.keys(colours).length} release colours to ${location}`);
	});
};
