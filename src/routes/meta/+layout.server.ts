import { PUBLIC_STRAPI_BASE_URL } from '$env/static/public';
import { strapi } from '$lib/fetch.svelte';

export const prerender = false;
export const load = async () => {
    const articleData = await strapi.getArticleData();

    
    return {
        articles: articleData || []
    };
};