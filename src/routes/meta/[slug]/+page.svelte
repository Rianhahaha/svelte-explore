<script lang="ts">
    import Modal from '$lib/components/Modal.svelte';
    import ArticleContent from '$lib/components/ArticleContent.svelte';
    import { goto } from '$app/navigation';

    let { data } = $props();
    // Data ini dapet dari +page.server.ts di atas
    let article = $derived(data.article); 

    function handleClose() {
        goto('/meta', { replaceState: true });
    }
</script>

<svelte:head>
    <title>{article.title} | Metadata Research</title>
    <meta name="description" content={`Baca artikel tentang ${article.title}`} />
    
    <meta property="og:title" content={article.title} />
    <meta property="og:image" content={article.cover?.url} />
</svelte:head>

<Modal onClose={handleClose}>
    <ArticleContent {article} />
</Modal>