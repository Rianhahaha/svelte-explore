import { strapi } from "$lib/fetch.svelte";
export const prerender = true;

export const load = async () => {
    const aboutData = await strapi.getAboutData();
    const articleData = await strapi.getArticleData();

    return {
        about: aboutData,
        articles: articleData
    }
}