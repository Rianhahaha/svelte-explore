<script lang="ts">
    import { page } from '$app/state'; 
    import type { Article } from '$lib/types';
    
    // Ambil data dari layout.server.ts
    let { data, children } = $props<{articles: Article[] }>(); 
    let articles = $derived(data);
</script>

<div class="min-h-screen bg-slate-900 text-white relative">
    
    <div class="p-10">
        <h1 class="text-2xl mb-6">Meta Gallery</h1>
        <div class="grid grid-cols-4 gap-4">
            {#each articles as article}
                <div class="border border-slate-700 p-4 rounded bg-slate-800">
                    <img src={article.cover?.url} class="h-32 w-full object-cover mb-2" alt=""/>
                    <h3 class="font-bold">{article.title}</h3>
                    
                    <a href={`/meta/${article.slug}`} class="text-blue-400 block mt-2">
                        Open Modal
                    </a>
                </div>
            {/each}
        </div>
    </div>

    {@render children?.()}

</div>