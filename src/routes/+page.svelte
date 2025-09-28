<script lang="ts">
	import Logo from '$lib/brand/Logo.svelte';
	import BigIconLink from '$lib/ui/BigIconLink.svelte';
	import { GlobeIcon } from '@lucide/svelte';
</script>

<div class="flex flex-col gap-4">
	<h1 class="flex flex-row items-center gap-4">hai im lynndova <Logo className="size-10" /></h1>
	<hr />
	<BigIconLink text="Other Website" to="https://worldwidepixel.ca"
		><GlobeIcon size="20px" /></BigIconLink
	>
</div>
