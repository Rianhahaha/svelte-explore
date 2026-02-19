<script lang="ts">
    import { page } from '$app/state'; 
        import { pushState } from '$app/navigation';

    import type { Article } from '$lib/types';
    import Modal from '$lib/components/Modal.svelte';
    import ArticleContent from '$lib/components/ArticleContent.svelte';
    let { data, children } = $props<{articles: Article[] }>(); 
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

<div class="min-h-screen bg-slate-900 text-white relative">
    {#if page.state.showModal && page.state.selectedArticle}
    
    <Modal onClose={() => history.back()}>
        
        <ArticleContent article={page.state.selectedArticle as Article} />
    
    </Modal>
{/if}
{@render children?.()}
<div class="min-h-screen bg-slate-900 text-white p-10">
    <div class="grid grid-cols-4 gap-4">
        {#each articles ?? [] as article (article.id)}
            <div class="border border-slate-700 p-4 rounded bg-slate-800">
                <h3 class="text-lg font-bold">{article.title}</h3>
                <img class="w-full h-[10rem] object-cover"  src={article.cover?.url} alt="">
                
                <button 
                  
                    class="text-blue-400 mt-2 block hover:opacity-50 cursor-pointer"
                    onclick={(e) => openModal(e, article)}
                >
                    View
                </button>
            </div>
        {/each}
    </div>
</div>


</div>