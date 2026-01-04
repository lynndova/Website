import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { cloudflare } from '@cloudflare/vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), cloudflare()],
	ssr: {
		external: ['node:fs', 'node:path', 'node:util', 'node:stream', 'node:zlib', 'node:assert']
	}
});
