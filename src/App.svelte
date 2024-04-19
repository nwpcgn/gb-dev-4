<script>
	import { onMount } from 'svelte'
	import {theme} from './lib'
	import Router from 'svelte-spa-router'
	import GbSprite from './lib/GbSprite.svelte'
	import AppBar from './lib/AppBar.svelte'
	import Start from './routes/Start.svelte'
	import P1 from './routes/P1.svelte'
	import P2 from './routes/P2.svelte'
	let routes = {
		'/p1': P1,
		'/p2': P2,
		'*': Start 
	}
	onMount(() => {
		theme.set("cyberpunk")
		console.log('hi')
	})
</script>


<AppBar />
<main data-theme={$theme} class="main">
	<Router {routes} />
</main>
<GbSprite />