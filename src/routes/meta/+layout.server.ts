import { PUBLIC_STRAPI_BASE_URL } from '$env/static/public';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch }) => {
    const res = await fetch(`${PUBLIC_STRAPI_BASE_URL}/api/articles?populate=*`);
    const data = await res.json();
    
    return {
        articles: data.data || []
    };
};