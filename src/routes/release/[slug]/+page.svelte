<script lang="ts">
	import { dev } from '$app/environment';
	import { formatDate } from '$lib';
	import type { IncompleteNodeVibrantPalette, Release } from '$lib/types.js';
	import BigIconLink from '$lib/ui/BigIconLink.svelte';
	import { rgbToHex, type Palette } from '@vibrant/color';

	let { data } = $props();
		const illGottenData = () => data;

	const release: Release = illGottenData().metadata;

	const hasBandcamp = illGottenData().embeds.find((embed) => embed.type === 'bandcamp');
	const hasYoutube = illGottenData().embeds.find((embed) => embed.type === 'youtube');

	// WHAT THE JANK
	function getGradient(palette: IncompleteNodeVibrantPalette) {
		return `linear-gradient(90deg,${rgbToHex(...palette.LightVibrant.rgb)} 0%, ${rgbToHex(...palette.Vibrant.rgb)} 50%, ${rgbToHex(...palette.DarkVibrant.rgb)} 100%)`;
	}

	const colour: { palette: IncompleteNodeVibrantPalette } = illGottenData().colours[release.slug];
</script>

<div class="flex flex-col gap-8 py-16 text-sm">
	<img
		draggable="false"
		style="borderColor: color-mix(in oklab, {release.colour}, transparent 80%"
		class="mx-auto block size-56 rounded-md border shadow-2xl md:hidden"
		src={release.icon}
		alt="{release.title} album cover"
	/>
	<div class="grid grid-cols-1 grid-rows-[auto_auto] gap-x-6 gap-y-4 md:grid-cols-[12rem_auto]">
		<img
			draggable="false"
			style="borderColor: color-mix(in oklab, {release.colour}, transparent 80%"
			class="row-start-2 hidden size-48 rounded-md border shadow-2xl md:block"
			src={release.icon}
			alt="{release.title} album cover"
		/>
		<span class="text-brand-text-secondary italic md:col-start-2"
			>{formatDate(new Date(release.date))}</span
		>

		<div class="flex flex-col gap-4">
			<h1 class="text-6xl font-bold">{release.title}</h1>
			<span>
				{release.summary}
			</span>
			<div class="flex flex-row flex-wrap items-center gap-3">
				{#each release.links as link}
					<BigIconLink
						text={link.name}
						to={link.to}
						external={true}
						showIcon={true}
						style="border-bottom-color: color-mix(in oklab, {release.colour}, transparent 80%)"
						classList="bg-opacity-50 bg-brand-background-secondary border-b-[1px]"
					/>
				{/each}
			</div>
		</div>
	</div>
	<span class="border-b"></span>
	<div
		class="flex w-full flex-col items-center gap-4 lg:flex-row lg:items-start lg:justify-between"
	>
		<div class="md">
			{@render data.content()}
		</div>
		<div class="flex flex-col items-center gap-2 lg:items-start">
			{#if data.embeds.length > 0}
				<h3 class="w-fit px-2">Listen</h3>
			{/if}
			{#if hasBandcamp}
				<div class="flex w-fit flex-col gap-1">
					<div class="bg-dova-background-secondary w-fit rounded-3xl border p-2">
						<iframe
							title="Bandcamp embed for {release.title}"
							class="rounded-2xl"
							style="border: 0; width: 350px; height: 654px;"
							src={`https://bandcamp.com/EmbeddedPlayer/${hasBandcamp.source.to.includes('album') ? 'album' : 'track'}=${hasBandcamp.id}/size=large/bgcol=ffffff/linkcol=${release.colour.replace('#', '')}/transparent=true/`}
							seamless
						></iframe>
					</div>
					<p
						class="hover:[&>a]:text-dova-blue-1 my-0 p-2 text-center text-xs text-slate-500 transition-colors hover:text-slate-300"
					>
						Embedded Bandcamp content is subject to their
						<a
							class="text-dova-blue-4 text-center transition-colors"
							target="_blank"
							href="https://bandcamp.com/privacy"
						>
							privacy policy
						</a>
						.
					</p>
				</div>
			{/if}
			{#if hasYoutube}
				<div class="flex w-fit flex-col gap-1">
					<div class="bg-dova-background-secondary w-fit rounded-3xl border p-2">
						<iframe
							width="350"
							height="197"
							src="https://www.youtube-nocookie.com/embed/{hasYoutube.id}"
							title="YouTube video player for {release.title}"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							referrerpolicy="strict-origin-when-cross-origin"
							class="rounded-2xl"
							allowfullscreen
						></iframe>
					</div>
					<p
						class="hover:[&>a]:text-dova-blue-1 my-0 p-2 text-center text-xs text-slate-500 transition-colors hover:text-slate-300"
					>
						Embedded YouTube content is subject to their
						<a
							class="text-dova-blue-4 text-center transition-colors"
							target="_blank"
							href="https://youtube.com/privacy"
						>
							privacy policy
						</a>
						.
					</p>
				</div>
			{/if}
		</div>
	</div>
</div>
{#if colour}
	<div
		style="background: {getGradient(colour.palette)};"
		class="bgimg pointer-events-none absolute top-0 left-0 z-[-2] h-[80%] w-full overflow-hidden object-cover opacity-35 blur-2xl saturate-200"
	></div>
	{#if dev}
		<div class="flex flex-row flex-wrap">
			<div
				class="size-20"
				style="background-color: {rgbToHex(...colour.palette.DarkMuted.rgb)}"
			></div>
			<div
				class="size-20"
				style="background-color: {rgbToHex(...colour.palette.DarkVibrant.rgb)}"
			></div>
			<div
				class="size-20"
				style="background-color: {rgbToHex(...colour.palette.LightMuted.rgb)}"
			></div>
			<div
				class="size-20"
				style="background-color: {rgbToHex(...colour.palette.LightVibrant.rgb)}"
			></div>
			<div class="size-20" style="background-color: {rgbToHex(...colour.palette.Muted.rgb)}"></div>
			<div
				class="size-20"
				style="background-color: {rgbToHex(...colour.palette.Vibrant.rgb)}"
			></div>
		</div>
	{/if}
{/if}
