<script>
	import MainMenu from './gbcomp/MainMenu.svelte'
	import ActionMenu from './gbcomp/ActionMenu.svelte'
	import { sleep, fetchData } from '../lib'
	import { actionM, mainM } from './gbcomp/menus'
	export let name = 'Name'
	let pkmn = []
	let currentIcon = '#pkmn-19'
	let stat1 = ''
	let stat2 = ''
	let op1 = false,
		op2 = false
	function toggle1() {
		op1 = !op1
	}
	function toggle2() {
		op2 = !op2
	}

	$: toggle1(stat2)
	$: toggle2(stat1)
	let promise = fetchData('/data/pkmn2.json')
		.then((data) => {
			pkmn = data
		})
		.then(() => sleep(200))
</script>

<svelte:head><title>nwp-studio</title></svelte:head>

{#await promise}
	<section class="layer center nwp">
		<article>
			<span>... loading</span>
		</article>
	</section>
{:then _}
	<section class="layer center gb">
		<article class="relative border border-red-500">
			<ActionMenu bind:open={op1} items={actionM} bind:current={stat1} />
			<MainMenu bind:open={op2} items={mainM} bind:current={stat2} />
		</article>
	</section>
{/await}

<style>
	article {
		width: 512px;
		height: 512px;
	}
</style>
