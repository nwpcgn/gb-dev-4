<script>
	import GbKeyboard from './GbKeyboard.svelte'
	import { sleep, fetchData } from '../lib'
	import { onMount, tick } from 'svelte'
	import { Loader, Hero } from './tiles/utils'
	let canvas
	let width = 512
	let height = 512
	let topDown = false,
		leftDown = false,
		rightDown = false,
		bottomDown = false
	let Game = {
		run(canvas, width = 512, height = 512) {
			this.canvas = canvas
			this.ctx = canvas.getContext('2d')
			this._previousElapsed = 0
			this._width = width
			this._height = height
			this.canvas.width = width
			this.canvas.height = height

			const p = this.load()
			Promise.all(p).then(
				function (loaded) {
					this.init()
					window.requestAnimationFrame(this.tick)
				}.bind(this)
			)
		},
		load() {
			return [
				Loader.loadImage('tiles', '/img/tile_gb5.png'),
				Loader.loadImage('character', '/img/character5.png')
			]
		},
		init() {
			this.tileAtlas = Loader.getImage('tiles')
			this.hero = new Hero(map, 160, 160, 0, 0, 32, 32)
			// console.log(this.hero)
		}
	}
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
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 11, 11, 11, 11, 0, 0, 0, 0, 24, 24, 24, 11, 0, 0, 0, 0, 24, 24,
				24, 11, 0, 0, 0, 0, 23, 24, 22, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0
			]
		],
		getTile: function (layer, col, row) {
			return this.layers[layer][row * map.cols + col]
		},
		isSolidTileAtXY: function (x, y) {
			const col = Math.floor(x / this.tsize)
			const row = Math.floor(y / this.tsize)

			// tiles 3 and 5 are solid -- the rest are walkable
			// loop through all layers and return TRUE if any tile is solid
			return this.layers.reduce(
				function (res, layer, index) {
					const tile = this.getTile(index, col, row)
					const isSolid = tile === 3 || tile === 5
					return res || isSolid
				}.bind(this),
				false
			)
		},
		getCol: function (x) {
			return Math.floor(x / this.tsize)
		},
		getRow: function (y) {
			return Math.floor(y / this.tsize)
		},
		getX: function (col) {
			return col * this.tsize
		},
		getY: function (row) {
			return row * this.tsize
		}
	}

	Game.tick = function (elapsed) {
		window.requestAnimationFrame(this.tick)
		this.ctx.clearRect(0, 0, this._width, this._height)
		// compute delta time in seconds -- also cap it
		let delta = (elapsed - this._previousElapsed) / 1000.0
		delta = Math.min(delta, 0.25) // maximum delta of 250 ms
		this._previousElapsed = elapsed
		this.update(delta)
		this.render()
	}.bind(Game)
	Game.update = function (delta) {
		var dirx = 0
		var diry = 0
		if (leftDown) {
			dirx = -1
		} else if (rightDown) {
			dirx = 1
		} else if (topDown) {
			diry = -1
		} else if (bottomDown) {
			diry = 1
		}

		this.hero.move(delta, dirx, diry)
	}
	Game._drawLayer = function (layer) {
		let id = 0
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
		this._drawLayer(0)
		this._drawLayer(1)
		this.ctx.drawImage(
			this.hero.image,
			this.hero.spriteX,
			this.hero.spriteY,
			this.hero.spriteWidth,
			this.hero.spriteHeight,
			this.hero.x,
			this.hero.y,
			this.hero.spriteWidth,
			this.hero.spriteHeight
		)
		
	}

	onMount(async () => {
		if (!canvas) return

		await tick()
		Game.run(canvas, width, height)
	})
</script>

<svelte:head><title>nwp-studio</title></svelte:head>

<section class="layer center">
	<canvas bind:this={canvas} {width} {height}>Poke 3</canvas>
</section>

<GbKeyboard bind:topDown bind:rightDown bind:bottomDown bind:leftDown />

<style>
	canvas {
		background-color: rgba(255, 0, 0, 0.2);
	}
</style>
