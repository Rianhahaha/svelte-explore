<script lang="ts">
	import type { Snippet } from 'svelte';
	interface Props {
		text?: string;
		status?: string;
		type?: string;
		onclick?: () => void;
		children?: Snippet;
	}
	let { text, status, type, children, onclick }: Props = $props();
</script>

<button
	{onclick}
	class={`w-fit rounded-full border-2 text-sm font-bold  
    ${status === 'danger' ? 'bg-red-500 border-red-500 hover:bg-transparent text-white ' : 'border-white bg-white hover:text-white hover:bg-white/10 '}
    ${type === 'icon' ? 'p-2' : 'px-4 py-2 '} 
     cursor-pointer`}>
	{text}
	{#if children}
		{@render children()}
	{/if}
</button>
