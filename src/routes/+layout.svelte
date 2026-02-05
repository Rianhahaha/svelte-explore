<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	let pageTitle = 'Svelte Explore App';

	let { children } = $props();

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta property="og:title" content={pageTitle} />
    <title>{pageTitle}</title>

</svelte:head>
{@render children()}
