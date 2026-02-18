import { PUBLIC_STRAPI_BASE_URL } from '$env/static/public';
import type { AboutPage, Article } from '$lib/types';

class Strapi {
	private async request<T>(path: string): Promise<T> {
		const res = await fetch(`${PUBLIC_STRAPI_BASE_URL}/api${path}`);
		if (!res.ok) throw new Error(`Fetching Error: ${res.statusText}`);

		const json = await res.json();
		return json.data;
	}

	async getAboutData(): Promise<AboutPage> {
		return this.request<AboutPage>('/about?populate=*');
	}

	async getArticleData(): Promise<Article> {
		return this.request<Article>('/articles?populate=*');
	}
	async getArticleBySlug(slug: string): Promise<Article | null> {
		const path = `/articles?filters[slug][$eq]=${slug}&populate=*`;
		const res = await fetch(`${PUBLIC_STRAPI_BASE_URL}/api${path}`);
		const json = await res.json();

		return json.data?.[0] || null;
	}
}

class publicAPI {
	
}

export const strapi = new Strapi();
