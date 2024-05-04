<script>
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()
	export let items = [
		{
			label: 'Pokedex',
			value: 'pokedex',
			type: 'radio',
			closeBtn: true,
			isHidden: false
		},
		{
			label: 'Pokemon',
			value: 'pokemon',
			type: 'radio',
			closeBtn: false,
			isHidden: false
		},
		{
			label: 'Items',
			value: 'items',
			type: 'radio',
			closeBtn: false,
			isHidden: false
		},
		{
			label: 'Player',
			value: 'player',
			type: 'radio',
			closeBtn: false,
			isHidden: false
		},
		{
			label: 'Save',
			value: 'savegame',
			type: 'button',
			closeBtn: false,
			isHidden: false
		},
		{
			label: 'Options',
			value: 'options',
			type: 'radio',
			closeBtn: false,
			isHidden: false
		},
		{
			label: 'Exit',
			value: 'close',
			type: 'radio',
			closeBtn: true,
			isHidden: false
		}
	]
	export let current = ''
	export let open = false
	let rg = items.filter((el) => el.type === 'radio' || el.type === 'sup')
	let bg = items.filter((el) => el.type === 'button')
	console.log(items.length, rg.length, bg.length)

	function btnAction(parameters) {
		dispatch('click', parameters)
		current = ''
	}
</script>

<section
	class="window bottom-0 transform duration-300 ease-in"
	class:-translate-x-full={!open}>
	<nav class="gb-menu">
		{#each items as { label, value, type, closeBtn, isHidden }}
			{#if type === 'radio' || type === 'sup'}
				<label class="button">
					<span>{label}</span>
					<input class="sr-only" bind:group={current} type="radio" {value} />
				</label>
			{:else if type === 'button'}
				<button class="button" on:click={() => btnAction(value)}>
					<span>{label}</span>
				</button>
			{/if}
		{/each}
	</nav>
</section>
