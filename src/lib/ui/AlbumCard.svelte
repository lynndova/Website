<script lang="ts">
	import chroma from 'chroma-js';
	import type { Release } from '$lib/types';
	import { formatDate } from '$lib';
	let { data }: { data: Release } = $props();

	const keyColour = chroma(data.colour);

	const colours = {
		key: keyColour.hex(),
		bg1: keyColour.shade(0.94).saturate(-0.6).hex(),
		bg2: keyColour.shade(0.9).saturate(-0.2).hex()
	};

	function getBackgroundGradient() {
		return `background: linear-gradient(45deg, ${colours.bg1} 0%, ${colours.bg2} 100%);`;
	}
</script>

<a
	href="/release/{data.slug}"
	style={getBackgroundGradient()}
	class="flex cursor-pointer flex-col items-center justify-between gap-4 rounded-2xl border no-underline shadow-2xl transition hover:brightness-90 active:scale-95"
>
	<img
		class="size-64 rounded-2xl"
		draggable="false"
		src={data.icon}
		alt="Album cover for {data.title}"
	/>

	<div class="flex max-w-64 flex-col items-center justify-center gap-1 px-4 text-center">
		<span class="font-bold">{data.title}</span>
		<span class="text-sm">{formatDate(new Date(data.date))}</span>
	</div>
	<span></span>
</a>
