<script>
	import { onMount } from 'svelte'
	import { sleep } from './../lib/'
	let result = ''
	let totalDice = 0
	let breakdown = []
	let d6 = [1, 2, 3, 4, 5, 6]
	let rolls
	let promise
	function shuffle(array) {
		let currentIndex = array.length
		let temporaryValue, randomIndex

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex)
			currentIndex -= 1

			// And swap it with the current element.
			temporaryValue = array[currentIndex]
			array[currentIndex] = array[randomIndex]
			array[randomIndex] = temporaryValue
		}

		return array
	}

	function add(type) {
		rolls.sort()
		if (type === 'advantage') {
			rolls.shift()
		}
		if (type === 'disadvantage') {
			rolls.pop()
		}
		let total = rolls[0] + rolls[1]
		result = 'Partial Success'
		if (total < 6) {
			result = 'Failure'
		}
		if (total > 8) {
			result = 'Success'
		}
		totalDice = total
	}
	function roll(count) {
		for (let i = 0; i < count; i++) {
			shuffle(d6)
			rolls.push(d6[0])
		}
	}

	function handleDiceClick(event) {
		let d = event.target.getAttribute('data-roll')
		if (!d) return

		promise = sleep(800)
		rolls = []
		totalDice = 0
		result = ''
		roll(d === '2d6' ? 2 : 3)
		breakdown = rolls
		add(d)
	}

	onMount(() => {
		shuffle(d6)
	})
</script>

<section class="layer">
	<article class="content">
		<nav>
			<button class="btn btn-neutral" on:click={handleDiceClick} data-roll="2d6"
				>Roll 2D6</button>
			<button
				class="btn btn-neutral"
				on:click={handleDiceClick}
				data-roll="advantage">Roll with Advantage</button>
			<button
				class="btn btn-neutral"
				on:click={handleDiceClick}
				data-roll="disadvantage">Roll with Disadvantage</button>
		</nav>

		<article class="flex flex-col items-center gap-6">
			{#await promise then _}
				<div class="grid grid-cols-2 gap-4 p-4">
					{#each breakdown as item}
						<svg class="fill-current h-32 w-32 inline-block"
							><use xlink:href="#dice-{item}" /></svg>
					{/each}
				</div>

				<div>
					{#if totalDice}
						<div
							class="avatar placeholder"
							class:online={result === 'Success'}
							class:offline={result === 'Failure'}>
							<div class="bg-neutral text-neutral-content rounded-full w-36">
								<span class="text-6xl">{totalDice}</span>
							</div>
						</div>
					{/if}
				</div>
			{/await}
		</article>
	</article>
</section>

<nav class="absolute top-4 right-4 grid gap-2">
	{#each [1, 2, 3, 4, 5, 6] as item}
		<svg class="fill-current h-12 w-12 inline-block"
			><use xlink:href="#dice-{item}" /></svg>
	{/each}
</nav>
