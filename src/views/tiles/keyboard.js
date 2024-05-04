class Keyboard {
	constructor() {
		this.LEFT = 37
		this.RIGHT = 39
		this.UP = 38
		this.DOWN = 40
		this._keys = {
			37: false,
			38: false,
			39: false,
			40: false
		}


	}

	

	_onKeyDown(event) {
		const keyCode = event.keyCode
		console.log(this._keys, event.keyCode)
		if (this._keys[keyCode]) {
			event.preventDefault()
			this._keys[keyCode] = true
			console.log('Keydown', this._keys[keyCode])
		}
	}

	_onKeyUp(event) {
		const keyCode = event.keyCode
		// console.log(this._keys);
		// if (keyCode in this._keys) {
		// 	event.preventDefault()
		// 	this._keys[keyCode] = false
		// }
	}

	isDown(keyCode) {
		if (!keyCode in this._keys) {
			throw new Error('Keycode ' + keyCode + ' is not being listened to')
		}
		return this._keys[keyCode]
	}
}

export const keyboard = new Keyboard()
