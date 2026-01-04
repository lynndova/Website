<!-- svelte-ignore state_referenced_locally -->

<script lang="ts">
	import Logo from '$lib/brand/Logo.svelte';
	import AlbumCard from '$lib/ui/AlbumCard.svelte';
	import BigIconLink from '$lib/ui/BigIconLink.svelte';
	import { SiBandcamp, SiBluesky, SiSoundcloud, SiSpotify } from '@icons-pack/svelte-simple-icons';

	const { data } = $props();

	const releases = data.releases
		.sort((a, b) => new Date(a.metadata.date).getTime() - new Date(b.metadata.date).getTime())
		.reverse();
</script>

<div class="flex flex-col items-center gap-6">
	<div class="my-6 flex flex-col items-center gap-4">
		<h1 class="flex flex-row items-center gap-4">lynndova <Logo className="size-10" /></h1>
		<span>music person extraordinaire</span>
	</div>

	<span class="flex flex-row flex-wrap items-center justify-center gap-3">
		<BigIconLink text="Bandcamp" to="https://lynndova.bandcamp.com" external={true}
			><SiBandcamp size={20} /></BigIconLink
		>
		<BigIconLink
			text="Spotify"
			to="https://open.spotify.com/artist/3WlVCLjjg29ftwvau9WUVs"
			external={true}><SiSpotify size={20} /></BigIconLink
		>
		<BigIconLink text="SoundCloud" to="https://soundcloud.com/lynndova" external={true}
			><SiSoundcloud size={20} /></BigIconLink
		>
		<BigIconLink text="Bluesky" to="https://bsky.app/profile/lynndova.com" external={true}
			><SiBluesky size={20} /></BigIconLink
		>
	</span>
	<hr class="w-full" />

	<div
		class="grid w-fit auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
	>
		{#each releases as release}
			<AlbumCard data={release.metadata} />
		{/each}
	</div>
	<a href="/use">Music usage guidelines</a>
</div>
