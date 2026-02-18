import { error, redirect } from '@sveltejs/kit';
import { PUBLIC_STRAPI_BASE_URL } from '$env/static/public';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
    const { slug } = params;
    const res = await fetch(`${PUBLIC_STRAPI_BASE_URL}/api/articles?filters[slug][$eq]=${slug}&populate=*`);
    const data = await res.json();
    const article = data.data?.[0];
    if (!article) {
        throw redirect(303, '/meta'); 
    }
    return {
        article
    };
};