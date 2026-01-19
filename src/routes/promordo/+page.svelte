<script lang="ts">
	import { focusState, taskList } from '$lib/state.svelte';
	import { onDestroy } from 'svelte';
	import Button from '$lib/components/Button.svelte';
	import bgVideo from '$lib/assets/pomodoro/bg.mp4';
	import { Trash } from '@lucide/svelte';
	const interval = setInterval(() => {
		focusState.tick();
	}, 1000);
	onDestroy(() => clearInterval(interval));
</script>

<div class="relative flex h-dvh w-full">
	<div class="absolute -z-10 size-full bg-black/50"></div>
	<video src={bgVideo} autoplay class="absolute -z-20 size-full object-cover">
		<track kind="captions" />
	</video>
	<section class="flex w-[35%] flex-col items-center justify-start gap-2 p-5">
		<div class="w-full bg-white/5 border border-white/20 p-5 h-full rounded-2xl flex flex-col gap-5">
			<div class="flex w-full items-baseline justify-between gap-2">
				<input type="text" placeholder="Add New Task..." bind:value={taskList.currentInput} />
				<Button onclick={() => taskList.addTask()} text="Add"></Button>
			</div>
			{#if taskList.tasks.length == 0}
				No Task
			{:else}
				<!-- Task List -->
			{/if}
			{#each taskList.tasks as task (task.id)}
				<button onclick={() => taskList.setActiveTask(task.id)} class={`flex w-full items-center justify-between  px-5 py-2 text-white rounded-full font-semibold cursor-pointer outline-1 outline-transparent hover:outline-white
				${task.status === 'doing' ? 'bg-blue-500' : 'bg-white/30'}
				`}>
					<p>{task.title}</p>
					<div class="flex items-center gap-2">
						<div class="text-sm " >
							{task.status}
						</div>
						<Button onclick={() => taskList.deleteTask(task.id)} type='icon' status='danger'>
							<Trash class='text-inherit'/>
						</Button>
					</div>
				</button>
			{/each}
		</div>
	</section>
	<section class="flex size-full flex-col items-center justify-center p-5 shadow-xl">
		{#if focusState.activeTaskId === null}
			<h1 class="text-white">Please Select Add and select your task first...</h1>
		{:else}
			<span class="rounded-full px-4 py-1 text-sm font-bold tracking-widest text-white uppercase">
				{focusState.modeLabel}
				{focusState.cycleCount}
			</span>
			<h1 class="text-white">
				Focus on {focusState.activeTasks?.title}
			</h1>
			<h1 class="font-mono text-6xl font-bold text-orange-500">
				{focusState.formattedTime}
			</h1>
			<!-- <div class="flex w-full items-baseline justify-between gap-2">
				<input type="number" max="60" placeholder="Change Time..." bind:value={focusTime} />
				<button
					onclick={() => focusState.changeTime(focusTime)}
					class="mt-4 cursor-pointer rounded-full bg-orange-600 px-6 py-2 transition-all hover:bg-orange-500"
				>
					changeTime
				</button>
			</div> -->
			<button
				onclick={() => focusState.toggleTimer()}
				class=" cursor-pointer rounded-full bg-orange-600 px-6 py-2 transition-all hover:bg-orange-500"
			>
				{focusState.isActive ? 'Pause' : 'Start'}
			</button>
			<button
				class="mt-4 cursor-pointer bg-slate-500 p-2 text-white"
				onclick={() => taskList.setDoneTask(focusState.activeTaskId)}
			>
				Set to Done
			</button>
		{/if}
	</section>
</div>
