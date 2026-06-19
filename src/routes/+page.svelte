<script lang="ts">
	import releases from '$lib/releases.json';
	import Logo from '$lib/brand/Logo.svelte';
	import AlbumCard from '$lib/ui/AlbumCard.svelte';
	import { SiBandcamp, SiBluesky, SiSoundcloud, SiSpotify } from '@icons-pack/svelte-simple-icons';
	import type { ReleaseContainer } from '$lib/types.js';
	import LinkButton from '$lib/ui/LinkButton.svelte';

	const { data: dataGet } = $props();

	const illGottenData = () => dataGet;
	const data = illGottenData();

	const sortedReleases = (releases as ReleaseContainer[])
		.sort((a, b) => new Date(a.metadata.date).getTime() - new Date(b.metadata.date).getTime())
		.reverse();
</script>

<div class="flex flex-col items-center gap-6">
	<div class="my-6 flex flex-col items-center gap-4">
		<h1 class="flex flex-row items-center gap-4">lynndova <Logo className="size-10" /></h1>
		<span>music person extraordinaire</span>
	</div>

	<span class="flex flex-row flex-wrap items-center justify-center gap-3">
		<LinkButton to="https://lynndova.bandcamp.com" external
			><SiBandcamp size={20} /> Bandcamp</LinkButton
		>
		<LinkButton to="https://open.spotify.com/artist/3WlVCLjjg29ftwvau9WUVs" external
			><SiSpotify size={20} /> Spotify</LinkButton
		>
		<LinkButton to="https://soundcloud.com/lynndova" external
			><SiSoundcloud size={20} /> SoundCloud</LinkButton
		>
		<LinkButton to="https://bsky.app/profile/lynndova.com" external
			><SiBluesky size={20} /> Bluesky</LinkButton
		>
	</span>
	<hr class="w-full" />

	<div
		class="grid w-fit auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
	>
		{#each sortedReleases as release}
			<AlbumCard data={release.metadata} />
		{/each}
	</div>
	<a href="/use">Music usage guidelines</a>
</div>
