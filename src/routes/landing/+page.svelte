<script lang="ts">
	let {data} = $props()
</script>

<div class="flex h-dvh w-full">
	<section>
			<h1> Data Fetched At :  {data.fetchedAt}</h1>
			{#each data.articles as article (article.id)}
				<div>
					{article.title}
				</div>
			{/each}

	</section>
</div>
