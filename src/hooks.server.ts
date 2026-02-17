import type { ServerInit } from '@sveltejs/kit';
import fs from 'node:fs';
/*import { generateColours } from '$lib/server/colours';

export const init: ServerInit = async () => {
	const location = import.meta.resolve('./lib/colours.json');
	const colours = await generateColours();

	fs.writeFile(location, JSON.stringify(colours), {}, () => {
		console.log(`Generated ${Object.keys(colours).length} release colours to ${location}`);
	});
};
*/
