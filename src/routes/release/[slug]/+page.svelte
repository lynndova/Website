<!-- svelte-ignore state_referenced_locally -->

<script lang="ts">
	import { dev } from '$app/environment';
	import { formatDate } from '$lib';
	import type { IncompleteNodeVibrantPalette, Release } from '$lib/types.js';
	import { rgbToHex } from '@vibrant/color';
	import {
		SiApplemusic,
		SiBandcamp,
		SiSoundcloud,
		SiSpotify,
		SiTidal,
		SiYoutube,
		SiYoutubemusic
	} from '@icons-pack/svelte-simple-icons';
	import { ArrowDown, Disc3, ExternalLink } from '@lucide/svelte';
	import LinkButton from '$lib/ui/LinkButton.svelte';

	let { data } = $props();

	const release: Release = data.metadata;

	const hasBandcamp = data.embeds.find((embed) => embed.type === 'bandcamp');
	const hasYoutube = data.embeds.find((embed) => embed.type === 'youtube');

	// WHAT THE JANK
	function getGradient(palette: IncompleteNodeVibrantPalette) {
		return `linear-gradient(90deg,${rgbToHex(...palette.LightVibrant.rgb)} 0%, ${rgbToHex(...palette.Vibrant.rgb)} 50%, ${rgbToHex(...palette.DarkVibrant.rgb)} 100%)`;
	}

	const colour: { palette: IncompleteNodeVibrantPalette } = data.colours[release.slug];
</script>

<div
	style="
	--release-accent: {release.colour}
	--release-vibrant: {rgbToHex(...colour.palette.Vibrant.rgb)};
	--release-dark-vibrant: {rgbToHex(...colour.palette.DarkVibrant.rgb)};
	--release-light-vibrant: {rgbToHex(...colour.palette.LightVibrant.rgb)};
	--release-muted: {rgbToHex(...colour.palette.Muted.rgb)};
	--release-dark-muted: {rgbToHex(...colour.palette.DarkMuted.rgb)};
	--release-light-muted: {rgbToHex(...colour.palette.LightMuted.rgb)};
	"
	class="flex flex-col gap-8 py-16 text-sm"
>
	<img
		draggable="false"
		style="borderColor: color-mix(in oklch, {release.colour}, transparent 80%"
		class="mx-auto block size-56 rounded-md border shadow-2xl md:hidden"
		src={release.icon}
		alt="{release.title} album cover"
	/>
	<div class="grid grid-cols-1 grid-rows-[auto_auto] gap-x-6 gap-y-4 md:grid-cols-[12rem_auto]">
		<img
			draggable="false"
			style="borderColor: color-mix(in oklch, {release.colour}, transparent 80%"
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
			<div>
				<span class="flex flex-row flex-wrap items-center gap-3">
					{#each release.links.slice(0, 2) as link}
						<LinkButton showIcon external accent={release.colour} to={link.to}
							>{link.name}</LinkButton
						>
					{/each}
					<LinkButton accent={release.colour} to="#available-on"
						>More services <ArrowDown /></LinkButton
					>
				</span>
			</div>
		</div>
	</div>
	<span class="border-b"></span>
	<div
		class="flex w-full flex-col items-center gap-4 lg:flex-row lg:items-start lg:justify-between"
	>
		<div class="w-full max-w-2xl">
			<h3 class="mb-6! border-b" id="about">About</h3>

			{#if release.collaborators && release.collaborators.length > 0}
				<div
					class="flex flex-col gap-3 rounded-xl border px-4 py-3"
					style="border-color: var(--release-dark-muted); background-color: color-mix(in oklch, var(--release-dark-muted) 20%, transparent);"
				>
					<span class="text-md font-bold"
						>This is a <span style="color: {rgbToHex(...colour.palette.LightVibrant.rgb)}"
							>collab album</span
						>. Check out these other fine folks who helped out with this!</span
					>

					<hr style="border-color: var(--release-dark-muted)" />

					<div class="flex flex-row flex-wrap items-center gap-2">
						{#each release.collaborators as collaborator}
							<a
								style="border-color: color-mix(in oklch, var(--release-dark-muted) 66%, transparent);"
								class="bg-dova-background-secondary flex flex-row items-center gap-4 rounded-2xl border px-3 py-1 no-underline! transition hover:brightness-80 active:scale-95"
								target="_blank"
								href={collaborator.url}
							>
								<img
									class="bg-dova-background-secondary size-12 rounded-full border-2 shadow-md"
									alt="Avatar of {collaborator.name}"
									src={collaborator.icon}
								/>
								<span class="text-md font-bold">{collaborator.name}</span>
							</a>
						{/each}
					</div>
				</div>
			{/if}
			<article class="md">
				{@render data.content()}
			</article>
			<h3 class="my-6! border-b" id="available-on">Available on</h3>

			<div
				style="background-color: color-mix(in oklch, var(--release-dark-muted) 30%, transparent); border-color: var(--release-dark-muted);"
				class="bg-dova-background-secondary mt-6 flex flex-col rounded-xl border px-4 py-3"
			>
				<table>
					<thead>
						<tr>
							<th class="text-lg">Service</th>
							<th class="text-lg">Links</th>
						</tr>
					</thead>
					<tbody>
						{#each release.links.sort((a, b) => a.name.localeCompare(b.name)) as link}
							<tr>
								<td class="flex flex-row items-center gap-2 text-lg font-bold tracking-tight">
									{#if link.name === 'Apple Music'}
										<SiApplemusic />
									{:else if link.name === 'Bandcamp'}
										<SiBandcamp />
									{:else if link.name === 'SoundCloud'}
										<SiSoundcloud />
									{:else if link.name === 'Spotify'}
										<SiSpotify />
									{:else if link.name === 'TIDAL'}
										<SiTidal />
									{:else if link.name === 'YouTube'}
										<SiYoutube />
									{:else if link.name === 'YouTube Music'}
										<SiYoutubemusic />
									{:else}
										<Disc3 />
									{/if}
									{link.name}
								</td>
								<td>
									<a class="flex w-fit flex-row items-center gap-1" target="_blank" href={link.to}>
										{link.options?.join(', ')}
										<ExternalLink size={16} />
									</a>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
		<div class="top-2 flex w-full flex-col items-center gap-2 lg:sticky lg:w-fit">
			{#if data.embeds.length > 0}
				<h3 class="w-full max-w-2xl border-b px-2 lg:mb-2!">Listen</h3>
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

<style>
	thead > tr {
		background-color: var(--release-dark-muted) !important;
	}
	tr:nth-child(odd) {
		background-color: color-mix(in oklch, var(--release-dark-muted) 20%, transparent);
	}
</style>
