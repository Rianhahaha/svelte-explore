import adapter from '@sveltejs/adapter-static';
// import adapter from '@sveltejs/adapter-auto'; // for vercel
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

kit: {
        adapter: adapter({
            pages: 'build',
            assets: 'build',
            fallback: undefined, // Wajib undefined kalau mau murni static
            precompress: false,
            strict: true
        }),
        prerender: {
            // SvelteKit kadang bingung kalau ada link yang error (misal 404).
            // 'warn' biar build gak gagal total cuma gara-gara 1 gambar hilang.
            handleHttpError: 'warn', 
            
            // concurrency: 1 // Nyalakan ini kalau Strapi servermu kentang banget biar gak jebol
        }
    }

	
	// preprocess: vitePreprocess(),

	// kit: {
	// 	// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
	// 	// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
	// 	// See https://svelte.dev/docs/kit/adapters for more information about adapters.
	// 	adapter: adapter()
	// }
};

export default config;
