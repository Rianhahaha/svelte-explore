import type { PageServerLoad } from "./$types.js";
import { PUBLIC_STRAPI_BASE_URL } from "$env/static/public";

export const load: PageServerLoad = async ({ setHeaders, fetch }) => {
    try {
        const res = await fetch(`${PUBLIC_STRAPI_BASE_URL}/api/articles?populate=*`);
        console.log("data fetched")

        if (!res.ok) {
            throw new Error(`Response Error, Status : ${res.status}`)
        }

        const json = await res.json();
        setHeaders({
            'cache-control': 'public, max-age=120'
        });
        
        return {
            articles: json.data,
            fetchedAt: new Date().toLocaleTimeString()
        };
    } catch (error) {
        console.error('Fetching Articles Error: ', error);
    }
};

// import type { HandleFetch } from '@sveltejs/kit';

// export const handleFetch: HandleFetch = async ({ request, fetch }) => {
// 	if (request.url.startsWith('https://api.yourapp.com/')) {
// 		// clone the original request, but change the URL
// 		request = new Request(
// 			request.url.replace('https://api.yourapp.com/', 'http://localhost:9999/'),
// 			request
// 		);
// 	}

// 	return fetch(request);
// };
