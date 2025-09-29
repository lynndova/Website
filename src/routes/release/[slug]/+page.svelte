<script lang="ts">
	import { formatDate } from '$lib';
	import type { Release } from '$lib/types.js';
	import BigIconLink from '$lib/ui/BigIconLink.svelte';
	import type { RGBColor } from 'colorthief';

	let { data } = $props();

	const release: Release = data.metadata;
</script>

<div class="flex flex-col gap-8 py-16 text-sm">
	<img
		draggable="false"
		style="borderColor: color-mix(in oklab, {release.colour}, transparent 80%"
		class="mx-auto block size-56 rounded-md border-[1px] shadow-2xl md:hidden"
		src={release.icon}
		alt="{release.title} album cover"
	/>
	<div class="grid grid-cols-1 grid-rows-[auto_auto] gap-x-6 gap-y-4 md:grid-cols-[12rem_auto]">
		<img
			draggable="false"
			style="borderColor: color-mix(in oklab, {release.colour}, transparent 80%"
			class="row-start-2 hidden size-48 rounded-md border-[1px] shadow-2xl md:block"
			src={release.icon}
			alt="{release.title} album cover"
		/>
		<span class="text-brand-text-secondary italic md:col-start-2"
			>{formatDate(new Date(release.date))}</span
		>

		<div class="flex flex-col gap-4">
			<span class="text-6xl font-bold">{release.title}</span>
			<span>
				{release.summary}
			</span>
			<div class="flex flex-row flex-wrap items-center gap-2">
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
		<!--
			{
				linksHaveBandcamp && bcData && (
					<div class="flex w-fit flex-col gap-1">
						<div class="w-fit rounded-3xl border bg-brand-background-secondary p-2">
							<iframe
								class="rounded-2xl"
								style="border: 0; width: 350px; height: 654px;"
								src={`https://bandcamp.com/EmbeddedPlayer/${bcData.url.includes("album") ? "album" : "track"}=${bcData.id}/size=large/bgcol=ffffff/linkcol=${bcData.colour.replace("#", "")}/transparent=true/`}
								seamless
							/>
						</div>
						<p class="p-2 text-center text-xs text-slate-500 transition-colors hover:text-slate-300 [&>a]:hover:text-blue-500">
							Embedded Bandcamp content is subject to their
							<a
								class="text-center text-blue-700 transition-colors"
								target="_blank"
								href="https://bandcamp.com/privacy">
								privacy policy
							</a>
							.
						</p>
					</div>
				)
			}
				-->
	</div>
</div>
<!--
<div
	style={`background: ${data.colours.gradientCSS};
`}
	class="bgimg pointer-events-none absolute top-0 left-0 z-[-2] h-[75%] w-full overflow-hidden object-cover opacity-35 blur-2xl saturate-200"
></div>
	-->
