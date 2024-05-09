<script>
	import { renderable } from './game.js'

	export let color = 'hsl(0, 0%, 100%)'
	export let align = 'center'
	export let baseline = 'middle'

	export let text = ''
	export let x = 0
	export let y = 0
	export let maxW = 500
	export let fontSize = '16'
	export let fontFamily = "'Pokemon', monospace"
	// font-family: 'Pokemon', monospace; '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica'

	renderable((props) => {
		const { context, width, height } = props
		if (text) {
			context.fillStyle = color
			context.font = `${fontSize}px/1 ${fontFamily}`
			context.textAlign = align
			context.textBaseline = baseline
			context.fillText(text, x, y, maxW)
		}
	})
</script>

<!-- The following allows this component to nest children -->
<slot />
