import { strapi } from "$lib/fetch.svelte.js";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    const { slug } = params; // Ambil 'belajar-svelte' dari URL
    
    const article = await strapi.getArticleBySlug(slug);
    if (!article) {
        throw Error('No Article Found')
    }

    return {
        article
    };
};