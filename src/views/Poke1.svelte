<script>
	import { iconlist, sleep, fetchData } from '../lib'
	import { location } from 'svelte-spa-router'
	export let name = 'Name'
	export let sub = ''
	export let nav = []
	let pkmn = []
	let currentIcon = '#pkmn-19'
	let promise = fetchData('/data/pkmn2.json')
		.then((data) => {
			pkmn = data
		})
		.then(() => sleep(200))

	const changeIcon = async (e) => {
		promise = sleep(800)
		currentIcon = `#${e.target.value}`
	}
</script>

<svelte:head><title>nwp-studio</title></svelte:head>

<section class="layer">
	<article class="content">
		<header>
			<h3>{name}</h3>
			<div class="flex items-center gap-1">
				{#each nav as { name, item }}
					{#if item !== $location}
						<a href="#{item}" class="btn btn-neutral">{name}</a>
					{/if}
				{/each}
				<select
					data-theme="dim"
					on:change={changeIcon}
					class="select select-bordered w-full max-w-xs ml-auto">
					{#each $iconlist as icon}
						{#if icon.includes('pkmn')}
							<option value={icon} selected={currentIcon.includes(icon)}
								>{icon}</option>
						{/if}
					{/each}
				</select>
			</div>
		</header>
	</article>
	<article class="p-8 grid place-content-center">
		{#await promise}
			<div class="grid place-content-center h-96">... loading</div>
		{:then _}
			<div class="border border-gray-600">
				<svg class="pkmn-icon h-96 w-96"><use xlink:href={currentIcon} /></svg>
			</div>
			<div class="mt-12 pt-12">
				<header>
					<details class="collapse">
						<summary class="collapse-title">Content</summary>
						<article class="collapse-content">
							<h4>{sub}</h4>

							<h3>
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Sapiente quaerat cum, quis iusto nulla nesciunt magnam autem
								perspiciatis et voluptatibus? Maxime, delectus praesentium quam
								sit cupiditate veniam repudiandae non aperiam?
							</h3>
							<h5>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
								fuga, quia quidem assumenda rem reiciendis consectetur error
								voluptatem soluta in incidunt molestiae, atque molestias omnis
								quibusdam quas tempora cupiditate perspiciatis.
							</h5>
						</article>
					</details>
				</header>
			</div>
		{/await}
	</article>
	<article class="content gb">
		<section class="framed">
			<section class="inline-flex">
				<nav class="framed gb-menu">
					<label for="" class="button">Pokédex</label>

					<label for="" class="button">Pokémon</label>

					<label for="" class="button">Item</label>

					<label for="" class="button">Player</label>

					<label for="" class="button">Save</label>

					<label for="" class="button">Option</label>

					<label for="" class="button">Exit</label>
				</nav>
			</section>
			<section class="w-full max-w-sm">
				<nav class="framed gb-menu-compact">
					<label for="" class="button">Fight</label>
					<label for="" class="button pokemon"
						><sup>P</sup> <sub>K</sub> <sup>M</sup> <sub>N</sub></label>
					<label for="" class="button">Item</label>
					<label for="" class="button">Run</label>
				</nav>
			</section>
		</section>
	</article>
</section>

<style>
	:root {
		--gb3-200: #a8a8a8;
		--gb3-400: #080808;
		--gb3-300: #585858;
		--gb3-100: #f8f8f8;
		--gb2-100: #b8f878;
		--gb2-200: #80b050;
		--gb2-300: #486828;
		--gb2-400: #102000;
		--gb-100: #e0f8cf;
		--gb-200: #86c06c;
		--gb-300: #306850;
		--gb-400: #222222;
		--poke-size: 500px;
	}
	summary {
		background-color: var(--gb-200);
		color: var(--gb-100);
		@apply text-xl font-medium;
	}

	.layer {
		background-color: var(--gb-100);
		color: var(--gb-300);
	}
	header {
		@apply py-8 space-y-3;
	}
	header h1 {
		@apply text-5xl font-bold;
	}
	header h4 {
		@apply text-2xl italic;
		color: var(--gb-200);
	}
	header h3 {
		@apply text-3xl font-bold;
	}
	header h5 {
		@apply text-xl italic;
		color: var(--gb-200);
	}
	.pkmn-icon {
		display: inline-block;
		width: var(--poke-size);
		height: var(--poke-size);
		stroke-width: 4;
		stroke: currentColor;
		fill: currentColor;
	}
</style>
