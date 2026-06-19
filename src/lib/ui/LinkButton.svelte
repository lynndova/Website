<script lang="ts">
	import { ExternalLink } from '@lucide/svelte';

	let {
		accent = null,
		children,
		classList = '',
		external = false,
		showIcon = false,
		style = '',
		to
	} = $props();
</script>

<a
	target={external === true ? '_blank' : ''}
	href={to}
	class="bg-dova-background-secondary flex w-fit flex-row items-center gap-4 rounded-2xl border border-b-4 px-4 py-3 text-lg font-semibold no-underline duration-75 select-none active:mt-0.75! active:border-b {classList}"
	style="{accent
		? `border-bottom-color: color-mix(in oklch, ${accent}, transparent 80%);`
		: ''} {style}"
>
	{@render children()}
	{#if showIcon}
		<ExternalLink size="20px" />
	{/if}
</a>
