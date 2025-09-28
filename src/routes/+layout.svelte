<script lang="ts">
	import HairlineSeparator from '$lib/ui/HairlineSeparator.svelte';
	import { deepMerge, MetaTags } from 'svelte-meta-tags';
	import '@fontsource-variable/dm-sans';
	import '@fontsource-variable/inter';
	import '../app.css';
	import { page } from '$app/state';
	import Logo from '$lib/brand/Logo.svelte';

	let { data, children } = $props();

	let metaTags = $derived(deepMerge(data.baseMetaTags, page.data.pageMetaTags));
</script>

<svelte:head>
	<meta name="theme-color" content="#009e8e" />
</svelte:head>

<MetaTags {...metaTags} />

<div class="flex h-dvh flex-col">
	<nav class="flex w-full flex-row justify-center border-b">
		<div
			class="flex w-full max-w-[72rem] flex-row items-center justify-center gap-4 p-6 sm:justify-between"
		>
			<span class="flex flex-row items-center gap-4 text-xl font-bold tracking-tight">
				<Logo />
				lynndova
			</span>
		</div>
	</nav>
	<main class="flex w-full flex-auto flex-row items-center justify-center">
		<div class="w-full max-w-[72rem] p-6">
			{@render children()}
		</div>
	</main>
	<footer class="bg-dova-background-secondary flex w-full flex-row justify-center border-t">
		<div class="flex w-full max-w-[72rem] flex-col items-center p-6 text-sm">
			<span>&copy; lynndova 2025 -</span>
		</div>
	</footer>
</div>
