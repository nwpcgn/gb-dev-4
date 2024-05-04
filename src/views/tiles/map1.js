let Loader = {
	images: {}
}

Loader.loadImage = function (key, src) {
	var img = new Image()

	var d = new Promise(
		function (resolve, reject) {
			img.onload = function () {
				this.images[key] = img
				resolve(img)
			}.bind(this)

			img.onerror = function () {
				reject('Could not load image: ' + src)
			}
		}.bind(this)
	)

	img.src = src
	return d
}

Loader.getImage = function (key) {
	return key in this.images ? this.images[key] : null
}

let canvas
// let ctx
let width = 512
let height = 512
let map = {
	atlasCols: 9,
	cols: 8,
	rows: 8,
	tsize: 64,
	layers: [
		[
			1, 2, 2, 2, 2, 2, 2, 3, 10, 11, 11, 11, 11, 11, 11, 12, 10, 11, 11, 11,
			11, 11, 11, 12, 10, 11, 11, 11, 11, 11, 11, 12, 10, 11, 11, 11, 11, 11,
			11, 12, 10, 11, 11, 11, 11, 11, 11, 12, 10, 11, 11, 11, 11, 11, 11, 12,
			19, 20, 20, 20, 20, 20, 20, 21
		],
		[
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 14, 13, 13, 13, 0, 0, 0, 0, 24, 24, 24, 24, 0, 0, 0, 0, 24, 24, 24,
			24, 0, 0, 0, 0, 24, 24, 24, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0
		]
	],
	getTile: function (layer, col, row) {
		return this.layers[layer][row * map.cols + col]
	}
}
let Game = {}

Game.run = function (canvas, width = 512, height = 512) {
	this.canvas = canvas
	this.ctx = canvas.getContext('2d')
	this._previousElapsed = 0
	this._width = width
	this._height = height
	this.canvas.width = width
	this.canvas.height = height

	var p = this.load()
	Promise.all(p).then(
		function (loaded) {
			this.init()
			window.requestAnimationFrame(this.tick)
		}.bind(this)
	)
}

Game.tick = function (elapsed) {
	window.requestAnimationFrame(this.tick)

	// clear previous frame
	this.ctx.clearRect(0, 0, this._width, this._height)

	// compute delta time in seconds -- also cap it
	var delta = (elapsed - this._previousElapsed) / 1000.0
	delta = Math.min(delta, 0.25) // maximum delta of 250 ms
	this._previousElapsed = elapsed

	this.update(delta)
	this.render()
}.bind(Game)
Game.update = function (delta) {}

Game.load = function () {
	return [
		Loader.loadImage('tiles', '/img/tile_gb5.png'),
		Loader.loadImage('character', '/img/character5.png')
	]
}

Game.init = function () {
	this.tileAtlas = Loader.getImage('tiles')
	this.hero = { x: 128, y: 384, image: Loader.getImage('character') }
}

Game._drawLayer = function (layer) {
	let id = 0
	daten.canvasArr[layer] = []
	for (let r = 0; r < map.rows; r++) {
		for (let c = 0; c < map.cols; c++) {
			const tile = map.getTile(layer, c, r)
			if (tile !== 0) {
				// 0 => empty tile
				const tileVal = tile - 1
				const sY = Math.floor(tileVal / map.atlasCols) * map.tsize
				const sX = (tileVal % map.atlasCols) * map.tsize
				const tX = c * map.tsize // target x
				const tY = r * map.tsize // target y
				const size = map.tsize
				// console.log({ id, layer, tileVal, sX, sY, tX, tY });
				this.ctx.drawImage(
					this.tileAtlas,
					sX,
					sY,
					map.tsize, // source width
					map.tsize, // source height
					tX, // c * map.tsize, // target x
					tY, // r * map.tsize, // target y
					map.tsize, // target width
					map.tsize // target height
				)
			}

			id++
		}
	}
}

Game.render = function () {
	// draw map background layer
	this._drawLayer(0)
	// draw game sprites
	this.ctx.drawImage(this.hero.image, this.hero.x, this.hero.y)
	// draw map top layer
	this._drawLayer(1)
}

onMount(async () => {
	if (!canvas) return

	await tick()
	Game.run(canvas, width, height)
})

// let canvas
// let ctx
// let width = 512
// let height = 512
// let map = {
// 	atlasCols: 9,
// 	cols: 8,
// 	rows: 8,
// 	tsize: 64,
// 	layers: [
// 		[
// 			1, 2, 2, 2, 2, 2, 2, 3, 10, 11, 11, 11, 11, 11, 11, 12, 10, 11, 11, 11,
// 			11, 11, 11, 12, 10, 11, 11, 11, 11, 11, 11, 12, 10, 11, 11, 11, 11, 11,
// 			11, 12, 10, 11, 11, 11, 11, 11, 11, 12, 10, 11, 11, 11, 11, 11, 11, 12,
// 			19, 20, 20, 20, 20, 20, 20, 21
// 		],
// 		[
// 			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
// 			0, 0, 14, 13, 13, 13, 0, 0, 0, 0, 24, 24, 24, 24, 0, 0, 0, 0, 24, 24, 24,
// 			24, 0, 0, 0, 0, 24, 24, 24, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0
// 		]
// 	],
// 	getTile: function (layer, col, row) {
// 		return this.layers[layer][row * map.cols + col]
// 	}
// }

// window.onload = function () {
//   var canvas = document.getElementById("canvas1");
//   Game.run(canvas, width, height);
// };

// function drawLayer(layer) {
// 	let id = -1
// 	daten.canvasArr[layer] = []
// 	for (let r = 0; r < map.rows; r++) {
// 		for (let c = 0; c < map.cols; c++) {
// 			const tile = map.getTile(layer, c, r)
// 			if (tile !== 0) {
// 				// 0 => empty tile
// 				const tileVal = tile - 1
// 				const sY = Math.floor(tileVal / map.atlasCols) * map.tsize
// 				const sX = (tileVal % map.atlasCols) * map.tsize
// 				const tX = c * map.tsize // target x
// 				const tY = r * map.tsize // target y
// 				const size = map.tsize
// 				// console.log({ id, layer, tileVal, sX, sY, tX, tY });
// 				this.ctx.drawImage(
// 					this.tileAtlas,
// 					sX,
// 					sY,
// 					map.tsize, // source width
// 					map.tsize, // source height
// 					tX, // c * map.tsize, // target x
// 					tY, // r * map.tsize, // target y
// 					map.tsize, // target width
// 					map.tsize // target height
// 				)
// 				// daten.canvasArr[layer].push({
// 				// 	id,
// 				// 	layer,
// 				// 	tileVal,
// 				// 	sX,
// 				// 	sY,
// 				// 	tX,
// 				// 	tY,
// 				// 	size
// 				// })
// 			}

// 			id++
// 		}
// 	}
// }

// function drawTites() {
// 	drawLayer(0)
// 	drawLayer(1)
// }

// function start() {
// 	drawTites(canvas)
// }

// function init() {
// 	canvas = document.getElementById('canvas1')
// 	ctx = canvas.getContext('2d')
// 	canvas.width = width
// 	canvas.height = height
// }

// let Loader = {
// 	images: {},
// 	loadImages(key, src) {
// 		const img = new Image()

// 		const d = new Promise(
// 			function (resolve, reject) {
// 				img.onload = function () {
// 					this.images[key] = img
// 					resolve(img)
// 				}.bind(this)

// 				img.onerror = function () {
// 					reject('Could not load image: ' + src)
// 				}
// 			}.bind(this)
// 		)

// 		img.src = src
// 		return d
// 	},
// 	getImage(key) {
// 		return key in this.images ? this.images[key] : null
// 	}
// }
