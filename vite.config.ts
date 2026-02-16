import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type Plugin } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	resolve: {
		alias: {
			fs: 'node:fs',
			path: 'node:path',
			util: 'node:util',
			stream: 'node:stream',
			zlib: 'node:zlib',
			assert: 'node:assert'
		}
	}
});
