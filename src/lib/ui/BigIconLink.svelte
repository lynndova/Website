<script lang="ts">
	let { text, to, external = false, children = null } = $props();
</script>

<a
	target={external === true ? '_blank' : ''}
	href={to}
	class="bg-dova-background-secondary flex w-fit flex-row items-center gap-4 rounded-2xl p-4 text-xl font-semibold no-underline duration-75 select-none active:scale-95"
>
	{#if children}
		{@render children()}
	{/if}
	{text}
</a>
