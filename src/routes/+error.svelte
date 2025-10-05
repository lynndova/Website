<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="flex flex-col gap-2">
	<h1 class="font-bold">{page.status}</h1>
	<span>{page.error?.message}</span>
</div>
