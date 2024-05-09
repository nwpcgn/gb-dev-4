<script>
	import CanvasEngine from './canvas/CanvasEngine.svelte'
	import { sleep, fetchData } from '../lib'
	import { onMount, tick } from 'svelte'
	import { Loader, Hero } from './tiles/utils'

	let canvas, ctx
	let width = 512
	let height = 512
	let topDown = false,
		leftDown = false,
		rightDown = false,
		bottomDown = false

	onMount(async () => {
		// if (!canvas) return
		// ctx = canvas.getContext('2d')
		// canvas.width = width
		// canvas.height = height
		// await tick()
		// run()
	})
</script>

<svelte:head><title>nwp-studio</title></svelte:head>

<section class="layer center">
	<CanvasEngine />
	<!-- <canvas bind:this={canvas} {width} {height}>Poke 3</canvas> -->
</section>

<style>
	canvas {
		background-color: rgba(255, 0, 0, 0.2);
	}
</style>
