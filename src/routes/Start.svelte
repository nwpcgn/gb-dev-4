<script>
	import Switch from '../lib/ThemeSwitch.svelte'
	let data = {
		name: 'NWP-Studio',
		sub: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
	}
</script>

<svelte:head><title>nwp-studio</title></svelte:head>

<section class="layer">
	<article class="content">
		<header class="nwp-header">
			<h1>{data.name}</h1>
			<h4>{data.sub}</h4>
			<div class="flex items-center gap-1">
				<a href="#/p1" class="btn btn-neutral btn-sm">Gameboy 1</a>
				<a href="#/p2" class="btn btn-neutral btn-sm">Gameboy 2</a>
				<a href="#/d1" class="btn btn-neutral btn-sm">Gameboy 3</a>
			</div>
		</header>
	</article>
	<article class="content nwp-header">
		<h3>Theme</h3>
		<Switch />
	</article>
</section>
