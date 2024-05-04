<script>
	import { sleep, fetchData } from '../lib'
	import { onMount, tick } from 'svelte'

	let canvas
	let ctx
	let width = 512
	let height = 512
	let map = {
		atlasCols: 23,
		cols: 8,
		rows: 8,
		tsize: 64,
		layers: [
			[
				242, 242, 243, 160, 160, 160, 241, 242, 242, 242, 243, 160, 160, 160,
				241, 242, 265, 265, 266, 160, 160, 160, 264, 265, 160, 160, 160, 160,
				160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160,
				160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160,
				160, 160, 160, 160, 160, 160, 160, 160
			],
			[
				0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 23, 0, 0, 0, 0, 0, 23, 0,
				0, 0, 23, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0, 23, 0, 0, 0
			],
			[
				112, 112, 89, 89, 89, 89, 89, 112, 112, 112, 89, 89, 89, 89, 89, 112,
				89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89,
				89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89,
				89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89
			]
		],
		getTile: function (layer, col, row) {
			return this.layers[layer][row * map.cols + col]
		}
	}

	const draw = async () => {
		if (!canvas) return

		ctx.beginPath()
		ctx.fillRect(0, 0, width, height)
		ctx.stroke()
		// const photos = await fetch(
		// 	'https://jsonplaceholder.typicode.com/photos?id=1',
		// 	{ mode: 'cors' }
		// ).then((x) => x.json())

		// const image = new Image()
		// image.src = photos[0].url
		// image.onload = () => {
		// 	ctx.fillStyle = ctx.createPattern(image, 'repeat')
		// 	ctx.fillRect(0, 0, canvas.width, canvas.height)
		// }
	}
	onMount(async () => {
		ctx = canvas.getContext('2d')
		canvas.width = width
		canvas.height = height
		await tick()
		draw()
	})
</script>

<svelte:head><title>nwp-studio</title></svelte:head>

<section class="layer center">
	<canvas bind:this={canvas} {width} {height}>Poke 3</canvas>
</section>

<style>
	canvas {
		background-color: rgba(255, 0, 0, 0.2);
	}
</style>
