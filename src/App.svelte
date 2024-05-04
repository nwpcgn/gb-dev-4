<script>
	import { onMount } from 'svelte'
	import { theme } from './lib'
	import AppBar from './lib/AppBar.svelte'
	import Router from 'svelte-spa-router'
	import SvgSprites from './lib/SvgSprites.svelte'
	import Start from './routes/Start.svelte'
	import P1 from './routes/P1.svelte'
	import P2 from './routes/P2.svelte'
	import D1 from './routes/D1.svelte'
	import { routes } from './routes'
	onMount(() => {
		theme.set('light')
		console.log('hi')
	})
</script>

<AppBar />
<main data-theme={$theme} class="main">
	<Router {routes} />
</main>
<SvgSprites />
