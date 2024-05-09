<script>
	import Text from './Text.svelte'
	import { width, height } from './game'
	import Canvas from './Canvas.svelte'
	import Background from './Background.svelte'
	import Rectangle from './Rectangle.svelte'
	import BackTiles from './BackTiles.svelte'

	const colors = {
		gb: {
			'100': '#B8F878',
			'200': '#80B050',
			'300': '#486828',
			'400': '#102000'
		},
		'gb-gray': {
			'100': '#F8F8F8',
			'200': '#A8A8A8',
			'300': '#585858',
			'400': '#080808'
		}
	}

	let fontSize = 12
	let offsetY = 100
	let y2 = $height - offsetY
	let y1 = $height - offsetY - fontSize
	let maxW = 500
	let setup = {
		msg1: {
			fontSize,
			color: colors.gb['300'],
			align: 'left',
			baseline: 'top',
			maxW,
			x: 0,
			y: y1
		},
		msg2: {
			fontSize,
			color: colors.gb['300'],
			align: 'left',
			baseline: 'top',
			maxW: maxW,
			x: 0,
			y: y2
		}
	}
</script>

<Canvas>
	<BackTiles />
	<Rectangle width={$width} height={12} color={colors.gb['200']} y={y1} />
	<Text text="Click to move the character." {...setup.msg1} />
	<Text text="Second text line characters." {...setup.msg2} />
</Canvas>
