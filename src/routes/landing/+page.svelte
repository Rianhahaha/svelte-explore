<script lang="ts">
	import type { Article, AboutPage, AboutBlock, StrapiImage } from '$lib/types';
	let { data } = $props<{ articles: Article[]; about: AboutPage[] }>();
	const { articles, about } = $derived(data);

</script>
<svelte:head>
    <title>Landing</title>

</svelte:head>

<div class="min-h-screen bg-slate-900 text-white">
	<section class="flex h-[50vh] w-full border-b border-slate-700">
		<div class="flex w-full items-center justify-center text-center">
			<h1 class="text-3xl font-bold">
				{about?.title ?? 'Loading Title...'}
			</h1>
		</div>
		<div class="flex w-full items-center justify-center bg-slate-800">
			<div>
				<!-- <p class="text-slate-400">Status: {about ? 'Data Ready' : 'Empty'}</p> -->
				{#each about.blocks as block}
					{#if block.__component === 'shared.rich-text'}
						<p class="rounded-xl border border-white/50 bg-white/20 p-2">
							{block.body} (RICH TEXT)
						</p>
					{/if}
					{#if block.__component === 'shared.quote'}
						<h1>
							{block.title}
						</h1>
						<p class="rounded-xl border border-white/50 bg-white/20 p-2">
							{block.body}
						</p>
					{/if}
				{/each}
			</div>
		</div>
	</section>

	<section class="p-10">
		<h2 class="mb-6 text-xl font-semibold"> Articles</h2>
		<div class="grid grid-cols-4 gap-4">
			{#each articles ?? [] as article (article.id)}
				<div
					class="flex flex-col gap-2 justify-between rounded-xl border border-slate-700 bg-slate-800 p-4 transition-colors hover:border-blue-500"
					>
					<!-- <img class="h-40 object-cover object-center" src={`${PUBLIC_STRAPI_BASE_URL}${article.cover?.url}`} alt=""> -->
					<img class="h-40 object-cover object-center" src={`${article.cover?.url}`} alt="">
					<h3 class="text-lg font-medium">{article.title}</h3>
					<a class="bg-sky-500 w-fit px-5 py-1 rounded-2xl border border-transparent hover:border-white/50" href={`/landing/${article.slug}`}>
						View
					</a>
				</div>
			{:else}
				<div class="text-slate-500 italic">Please Check Strapi Server...</div>
			{/each}
		</div>
	</section>
</div>
