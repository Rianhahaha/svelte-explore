<script lang="ts">
    import { pushState } from '$app/navigation';
    import { page } from '$app/state'; // <-- Ini BUKAN Store, ini State object
    import { PUBLIC_STRAPI_BASE_URL } from '$env/static/public';
    import type { Article } from '$lib/types';

    import Modal from '$lib/components/Modal.svelte';
    import ArticleContent from '$lib/components/ArticleContent.svelte';

    let { data } = $props<{ articles: Article[] }>();
    
    const articles = $derived(data.articles);

    function openModal(e: MouseEvent, article: Article) {
        e.preventDefault();
        const href = `/meta/${article.slug}`;
        
        pushState(href, { 
            showModal: true, 
            selectedArticle: article 
        });
    }
</script>



