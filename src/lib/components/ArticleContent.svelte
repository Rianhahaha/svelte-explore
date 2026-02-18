<script lang="ts">
    import type { Article } from '$lib/types';
    // Pake Runes Svelte 5
    let { article } = $props<{ article: Article }>();
</script>

<article class="prose prose-invert max-w-none">
    {#if article.cover?.url}
        <img 
            src={article.cover.url} 
            alt={article.title} 
            class="w-full h-64 object-cover rounded-lg mb-6"
        />
    {/if}

    <h1 class="text-3xl font-bold mb-2 text-white">{article.title}</h1>
    
    <div class="text-sm text-slate-400 mb-6 flex gap-4">
        <span>Published: {new Date(article.publishedAt).toLocaleDateString()}</span>
        <span>Slug: {article.slug}</span>
    </div>

    <div class="text-slate-300 leading-relaxed">
        {@html article.desription ?? 'Belum ada konten, penulisnya mager.'} 
    </div>
</article>