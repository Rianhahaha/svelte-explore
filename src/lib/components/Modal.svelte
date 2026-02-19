<script lang="ts">
    // Kita butuh 'snippet' buat render konten dinamis di dalemnya
    import type { Snippet } from 'svelte';
	import { fade } from 'svelte/transition';

    let { children, onClose } = $props<{ 
        children: Snippet, 
        onClose: () => void 
    }>();

    // Handle klik backdrop biar close (UX standar)
    function handleBackdropClick(e: MouseEvent) {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }
    
    // Handle tombol ESC (Accessibility wajib!)
    function handleKeydown(e: KeyboardEvent) {
        if (e.key === 'Escape') onClose();
    }
</script>

<svelte:window onkeydown={handleKeydown} />

<div 
    class="fixed w-screen h-screen z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-hidden"
    in:fade
    out:fade

>
    <div 
        class="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden"

    >
        <div class="flex justify-end p-2 absolute top-0 right-0 z-10">
            <button 
                onclick={onClose}
                class="bg-slate-800/80 hover:bg-red-500/80 text-white rounded-full p-2 transition-colors backdrop-blur-md cursor-pointer"
                aria-label="Close modal"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        </div>

        <div class="p-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
            {@render children()}
        </div>
    </div>
</div>