<script lang="ts">
	let { data } = $props();
	const article = $derived(data.article);
</script>

<svelte:head>
	<title>{article.title ?? 'article'}</title>
	<meta property="og:title" content={article.title ?? 'article'} />
	<meta property="og:description" content={article.description ?? 'fallback desc'} />
	<meta property="og:image" content={article.cover?.url} />
	<!-- <meta property="og:url" content="https://www.yourwebsite.com" /> -->
	<!-- Optional: specify image dimensions for better rendering -->
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="627" />
	<meta property="og:type" content="website" />
</svelte:head>

<article class="mx-auto flex flex-col bg-slate-900 px-6 py-20 text-white">
	<a href="/landing" class="mb-8 inline-block text-blue-400 hover:underline">← Back</a>

	{#if article}
		<header class="mb-10">
			<h1 class="mb-4 text-5xl font-bold">{article.title}</h1>
			<img class=" object-cover object-center" src={`${article.cover?.url}`} alt="" />

			<div class="text-sm text-slate-400">
				ID Dokumen: {article.documentId}
			</div>
		</header>

		<div class="prose prose-lg prose-invert">
			<p class="leading-relaxed">
				{article.description || 'Artikel ini gak punya deskripsi. Penulisnya lagi males.'}
			</p>
		</div>
	{/if}
</article>
