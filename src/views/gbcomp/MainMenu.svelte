<script>
	export let items = [
		{
			label: 'Fight',
			value: 'fight',
			type: 'radio',
			closeBtn: true,
			isHidden: false
		},
		{
			label: 'Pkmn',
			value: 'pkmn',
			type: 'sup',
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
			label: 'Run',
			value: 'run',
			type: 'radio',
			closeBtn: false,
			isHidden: false
		}
	]
	export let current = ''
	export let open = false
	function btnAction(parameters) {
		dispatch('click', parameters)
		current = ''
	}
</script>

<section
	class="window bottom-0 right-0 transform duration-300 ease-in"
	class:translate-y-full={!open}>
	<nav class="gb-menu-compact">
		{#each items as { label, value, type, closeBtn, isHidden }}
			{#if type === 'radio' || type === 'sup'}
				<label class="button">
					{#if type === 'sup'}
						<sup>P</sup> <sub>K</sub> <sup>M</sup> <sub>N</sub>
					{:else}
						<span>{label}</span>
					{/if}
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

<style>
	:root {
		--gb3-200: #a8a8a8;
		--gb3-400: #080808;
		--gb3-300: #585858;
		--gb3-100: #f8f8f8;
		--gb2-100: #b8f878;
		--gb2-200: #80b050;
		--gb2-300: #486828;
		--gb2-400: #102000;
		--gb-100: #e0f8cf;
		--gb-200: #86c06c;
		--gb-300: #306850;
		--gb-400: #222222;
		--poke-size: 500px;
	}

	.layer {
		background-color: var(--gb-100);
		color: var(--gb-300);
	}
	header {
		@apply py-8 space-y-3;
	}
	header h1 {
		@apply text-5xl font-bold;
	}
	header h4 {
		@apply text-2xl italic;
		color: var(--gb-200);
	}
	header h3 {
		@apply text-3xl font-bold;
	}
	header h5 {
		@apply text-xl italic;
		color: var(--gb-200);
	}
</style>
