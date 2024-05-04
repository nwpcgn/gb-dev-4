import { wrap } from 'svelte-spa-router/wrap'

// @index('./views/*.svelte', f => `import ${f.name} from '${f.path}${f.ext}'`)
import NotFound from './views/NotFound.svelte'
import Poke1 from './views/Poke1.svelte'
import Poke2 from './views/Poke2.svelte'
import Poke3 from './views/Poke3.svelte'
import Start from './views/Start.svelte'
// @endindex

export const nav = [
	{
		name: 'Start',
		item: '/'
	},
	{
		name: 'Pkmn 1',
		item: '/pkmn1'
	},
	{
		name: 'Pkmn 2',
		item: '/pkmn2'
	},
	{
		name: 'Pkmn 3',
		item: '/pkmn3'
	}
]

export const routes = {
	'/': wrap({
		component: Start,
		props: { name: 'Start', sub: 'Lorem ipsum dolor sit amet', nav }
	}),
	'/pkmn1': wrap({
		component: Poke1,
		props: { name: 'Nwp-Studio', sub: 'GB-Battle 1', nav }
	}),
	'/pkmn2': wrap({
		component: Poke2,
		props: { name: 'Nwp-Studio', sub: 'GB-Battle 2', nav }
	}),
	'/pkmn3': wrap({
		component: Poke3,
		props: { name: 'Nwp-Studio', sub: 'Tiles', nav }
	}),
	'*': NotFound
}
