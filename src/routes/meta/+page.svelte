<script lang="ts">
	import { PUBLIC_STRAPI_BASE_URL } from '$env/static/public';
	import type { Article, AboutPage, AboutBlock, StrapiImage } from '$lib/types';
	let { data } = $props<{ articles: Article[]; about: AboutPage[] }>();

	const { articles, about } = $derived(data);
	// console.log(articles);
</script>

<svelte:head>
	<title>Metadata Research</title>
	<meta charset="UTF-8" />
	<meta name="description" content="Free Web tutorials" />
	<meta name="keywords" content="HTML, CSS, JavaScript" />
	<meta name="author" content="John Doe" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<div class="min-h-screen bg-slate-900 text-white">
	<section class="p-10">
		<h2 class="mb-6 text-xl font-semibold">Metadata Research</h2>
		<div class="grid grid-cols-4 gap-4">
			{#each articles ?? [] as article (article.id)}
				<div
					class="flex flex-col justify-between rounded-xl border border-slate-700 bg-slate-800 p-4 transition-colors hover:border-blue-500"
				>
					<img class="h-40 object-cover object-center" src={`${article.cover?.url}`} alt="" />
					<h3 class="text-lg font-medium">{article.title}</h3>
					<a href={`/landing/${article.slug}`}> go </a>
				</div>
			{:else}
				<div class="text-slate-500 italic">Please Check Strapi Server...</div>
			{/each}
		</div>
	</section>
</div>
