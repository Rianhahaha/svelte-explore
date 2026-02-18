<script lang="ts">
    import { pushState } from '$app/navigation';
    import { page } from '$app/state'; // <-- Ini BUKAN Store, ini State object
    import { PUBLIC_STRAPI_BASE_URL } from '$env/static/public';
    import type { Article } from '$lib/types';

    import Modal from '$lib/components/Modal.svelte';
    import ArticleContent from '$lib/components/ArticleContent.svelte';

    // Pake $props() tandanya lo udah full Svelte 5
    let { data } = $props<{ articles: Article[] }>(); // Kasih type biar ga any
    
    // Derived value aman
    const articles = $derived(data.articles);
    console.log(articles);

    function openModal(e: MouseEvent, article: Article) {
        e.preventDefault();
        const href = `/meta/${article.slug}`;
        
        // Push state aman
        pushState(href, { 
            showModal: true, 
            selectedArticle: article 
        });
    }



</script>
{#if page.state.showModal && page.state.selectedArticle}
    
    <Modal onClose={() => history.back()}>
        
        <ArticleContent article={page.state.selectedArticle as Article} />
    
    </Modal>
{/if}
<div class="min-h-screen bg-slate-900 text-white p-10">
    <div class="grid grid-cols-4 gap-4">
        {#each articles ?? [] as article (article.id)}
            <div class="border border-slate-700 p-4 rounded bg-slate-800">
                <h3 class="text-lg font-bold">{article.title}</h3>
                
                <button 
                  
                    class="text-blue-400 mt-2 block"
                    onclick={(e) => openModal(e, article)}
                >
                    View (Modal)
                </button>
            </div>
        {/each}
    </div>
</div>

