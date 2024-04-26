<script>
	import { onMount } from 'svelte'
	import {theme} from './lib'
	import AppBar from './lib/AppBar.svelte'
	import Router from 'svelte-spa-router'
	import SvgSprites from './lib/SvgSprites.svelte';
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
<SvgSprites />