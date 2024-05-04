<script>
	import { onMount } from 'svelte'
	export let topDown = false,
		leftDown = false,
		rightDown = false,
		bottomDown = false

	let key
	let keyCode
	function onKeyDown(e) {
		key = e.key
		keyCode = e.keyCode
		switch (e.keyCode) {
			case 37:
				leftDown = true
				break
			case 38:
				topDown = true
				break
			case 39:
				rightDown = true
				break
			case 40:
				bottomDown = true
				break
		}
	}
	function onKeyUp(e) {
		key = ''
		keyCode = ''
		switch (e.keyCode) {
			case 37:
				leftDown = false

				break
			case 38:
				topDown = false
				break
			case 39:
				rightDown = false
				break
			case 40:
				bottomDown = false
				break
		}
	}
	onMount(() => {})
</script>

<div class="absolute inset-x-0 top-0 p-4">
	<div class="flex gap-2 justify-center">
		{#each [leftDown, topDown, rightDown, bottomDown] as item}
			<input type="checkbox" name="Left" bind:checked={item} class="radio" />
		{/each}
	</div>
	<div class="text-center p-4">
		{#if key}
			<kbd class="kbd">{key === ' ' ? 'Space' : key}</kbd>
			<p>KeyCode: {keyCode}</p>
		{:else}
			<p>Focus this window and press any key</p>
		{/if}
	</div>
</div>

<svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp} />
