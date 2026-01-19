import type { PageServerLoad } from './routes/landing/$types.js';

export const load: PageServerLoad = async ({ setHeaders, fetch }) => {
	try {
		const res = await fetch('http://localhost:1337/api/articles?populate=*');

		if (!res.ok) {
			throw new Error(`Response Error, Status : ${res.status}`)
		}

		const json = await res.json();
		setHeaders({
			'cache-control': 'public, max-age=60'
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
