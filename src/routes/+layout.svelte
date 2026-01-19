<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	let pageTitle = 'My Awesome Page';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta property="og:title" content={pageTitle} />
</svelte:head>
{@render children()}
