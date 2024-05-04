<script>
	import { iconlist } from './'
	import { onMount } from 'svelte'
	import IconsSprite from './pokemon/IconsSprite.svelte'
	import PkmnSprite from './pokemon/PkmnSprite.svelte'
	import Pkmn2Sprite from './pokemon/Pkmn2Sprite.svelte'
	let elem

	onMount(() => {
		let qe = elem.querySelectorAll('symbol')
		let list = []
		qe.forEach((element) => {
			list.push(element.id)
		})
		iconlist.set(list)
		// console.log({ list })
	})
</script>

<svg
	bind:this={elem}
	width="0"
	height="0"
	fill="none"
	style="visibility: hidden; position: absolute"
	aria-hidden="true">
	<symbol id="nwp-burger" viewBox="0 0 32 32">
		<title>burger</title>
		<path
			d="M4 5.333h24v2.667h-24v-2.667zM4 14.667h16v2.667h-16v-2.667zM4 24h24v2.667h-24v-2.667z" />
	</symbol>
	<symbol id="nwp-close" viewBox="0 0 32 32">
		<title>close</title>
		<path
			d="M16 14.115l6.6-6.6 1.886 1.886-6.6 6.6 6.6 6.6-1.886 1.886-6.6-6.6-6.6 6.6-1.886-1.886 6.6-6.6-6.6-6.6 1.886-1.886 6.6 6.6z" />
	</symbol>
	<PkmnSprite />
	<Pkmn2Sprite />
	<IconsSprite />
</svg>
