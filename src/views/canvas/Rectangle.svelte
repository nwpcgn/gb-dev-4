<script>
	import { renderable } from './game'
	export let color = null
	export let width = 0
	export let height = 0
	export let x = 0
	export let y = 0

	renderable((props) => {
		const { context } = props
		if (color) {
			context.fillStyle = color
			context.fillRect(x, y, width, height)
		}
	})
</script>

<!-- The following allows this component to nest children -->
<slot />
