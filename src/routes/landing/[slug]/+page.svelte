<script lang="ts">
	import { PUBLIC_STRAPI_BASE_URL } from '$env/static/public';

    let { data } = $props();
    const article = $derived(data.article);

</script>

<svelte:head>
    <title>{article.title ?? 'article'}</title>

</svelte:head>


<article class="flex flex-col bg-slate-900 mx-auto py-20 px-6 text-white">
    <a href="/landing" class="text-blue-400 hover:underline mb-8 inline-block">← Back</a>
    
    {#if article}
        <header class="mb-10">
            <h1 class="text-5xl font-bold mb-4">{article.title}</h1>
            <img class=" object-cover object-center" src={`${PUBLIC_STRAPI_BASE_URL}${article.cover?.url}`} alt="">

            <div class="text-slate-400 text-sm">
                ID Dokumen: {article.documentId}
            </div>
        </header>

        <div class="prose prose-invert prose-lg">
            <p class="leading-relaxed">
                {article.description || 'Artikel ini gak punya deskripsi. Penulisnya lagi males.'}
            </p>
        </div>
    {/if}
</article>