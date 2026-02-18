
<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	let pageTitle = 'Svelte Explore App';

	let { children } = $props();

</script>

{@render children()}
