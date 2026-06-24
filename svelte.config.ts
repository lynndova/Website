import adapter from '@sveltejs/adapter-cloudflare';
import { type Config } from '@sveltejs/kit';
import { mdsvex } from 'mdsvex';

const config: Config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	extensions: ['.svelte', '.mdx', '.md'],
	preprocess: [
		mdsvex({
			extensions: ['.mdx', '.md']
		})
	],
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		prerender: {
			// @ts-ignore
			handleInvalidUrl: 'ignore' // AT Protocol URLs
		}
	}
};

export default config;
