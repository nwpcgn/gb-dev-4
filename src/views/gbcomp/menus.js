const menues = {
	actionMenu: [
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
			value: '',
			type: 'radio',
			closeBtn: true,
			isHidden: false
		}
	],
	mainMenu: [
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
}

const actionM = menues.actionMenu
const mainM = menues.mainMenu

export { menues, actionM, mainM }
