<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	let pageTitle = 'My Awesome Page';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta property="og:title" content={pageTitle} />
</svelte:head>
<!-- <section class="flex h-dvh w-full items-center justify-center bg-amber-500">
	<div class="flex h-[10rem] w-[10rem] bg-teal-300 flex-wrap">
		<div class="w-fit h-fit min-w-1/2 flex-1 bg-red-500 ">adadasdasdasdvassbs</div>
		<div class="w-fit h-fit min-w-1/2 flex-1 bg-red-500 ">sfasfsdvfavaf</div>
		<div class="w-fit h-fit min-w-1/2 flex-1 bg-red-500 ">sfsafsvfasvfa</div>
		<div class="w-fit h-fit min-w-1/2 flex-1 bg-red-500 ">a</div>
	</div>
</section> -->
<section class="flex h-dvh w-full items-center justify-center bg-amber-500">
	<div class="flex flex-col justify-center gap-4 text-center">
		
		<a class="rounded-2xl bg-slate-800 px-5 py-2 text-white hover:bg-slate-600" href="/promordo"
			>To Pomodoro</a
		>
		<!-- <a class="rounded-2xl bg-slate-800 px-5 py-2 text-white hover:bg-slate-600" href="/landing"
			>To Simple landing Page</a
		>
		<a class="rounded-2xl bg-slate-800 px-5 py-2 text-white hover:bg-slate-600" href="/meta"
			>Metadata Research</a
		> -->
		<a class="rounded-2xl bg-slate-800 px-5 py-2 text-white hover:bg-slate-600" href="/leaflet"
			>Leaflet Research</a
		>
	</div>
</section>
