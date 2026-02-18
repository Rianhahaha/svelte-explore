<script lang="ts">
	
	import favicon from '$lib/assets/favicon.svg';
	let pageTitle = 'My Awesome Page';


</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta property="og:title" content={pageTitle} />
</svelte:head>
<section class="bg-amber-500 w-full h-dvh flex items-center justify-center">
    <div class="flex flex-col justify-center text-center gap-4">

        <a class="py-2 px-5 bg-slate-800 text-white rounded-2xl hover:bg-slate-600" href="/promordo">To Pomodoro</a>
        <a class="py-2 px-5 bg-slate-800 text-white rounded-2xl hover:bg-slate-600" href="/landing">To Simple landing Page</a>
        <a class="py-2 px-5 bg-slate-800 text-white rounded-2xl hover:bg-slate-600" href="/meta">Metadata Research</a>
    </div>

</section>