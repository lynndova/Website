<script lang="ts">
	import { page } from '$app/state';
	import { rgbToHex } from '@vibrant/color';

	const { className = '' } = $props();
	let fill = $derived(
		page.data.metadata?.slug && page.data.colours
			? rgbToHex(...page.data.colours[page.data.metadata.slug].palette.LightVibrant.rgb)
			: '#009e8e'
	);
</script>

<svg
	id="lynndova-logo"
	class="size-6 {className}"
	viewBox="0 0 42 42"
	xmlns="http://www.w3.org/2000/svg"
	><path
		style="font-variation-settings:normal;-inkscape-stroke:none"
		d="M28 36a14 14 0 0014-14 14 14 0 00-1.876-7A14 14 0 0128 22a14 14 0 01-.147-.01 14 14 0 01-1.729 5.007 14 14 0 00-11.977-6.996A14 14 0 0014 21.996a14 14 0 0014 14zM14.147 20.005A14 14 0 0115.877 15a14 14 0 0011.976 6.996A14 14 0 0028 20 14 14 0 0014 6 14 14 0 000 20a14 14 0 001.876 7A14 14 0 0114 20a14 14 0 01.147.01z"
		{fill}
		fill-rule="evenodd"
	/></svg
>
