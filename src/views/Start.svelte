<script>
	import Switch from '../lib/ThemeSwitch.svelte'
	import { location } from 'svelte-spa-router'
	export let name = 'Name'
	export let sub = ''
	export let nav = []
</script>

<svelte:head><title>nwp-studio</title></svelte:head>

<section class="layer nwp">
	<article class="content">
		<header class="nwp-header">
			<h1>{name}</h1>
			<h4>{sub}</h4>
			<div class="flex items-center gap-1">
				{#each nav as { name, item }}
					{#if item !== $location}
						<a href="#{item}" class="btn btn-neutral btn-sm">{name}</a>
					{/if}
				{/each}
			</div>
		</header>
	</article>
	<article class="content nwp-header">
		<h3>Theme</h3>
		<Switch />
	</article>
</section>
