<script lang="ts">
	import { ExternalLink } from '@lucide/svelte';

	let {
		text,
		to,
		external = false,
		showIcon = false,
		classList = '',
		style = '',
		children = null
	} = $props();
</script>

<a
	target={external === true ? '_blank' : ''}
	href={to}
	class="bg-dova-background-secondary flex w-fit flex-row items-center gap-4 rounded-2xl border px-4 py-3 text-lg font-semibold no-underline duration-75 select-none active:scale-95 {classList}"
	{style}
>
	{#if children}
		{@render children()}
	{/if}
	{text}
	{#if showIcon}
		<ExternalLink size="20px" />
	{/if}
</a>
