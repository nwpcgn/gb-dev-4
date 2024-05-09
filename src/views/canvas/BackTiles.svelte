<script>
	import { renderable } from './game'
	import Loader from './Loader'
	export let color = null

	export let map = {
		heroSize: 32,
		atlasCols: 23,
		cols: 8,
		rows: 8,
		tsize: 64,
		layers: [
			[
				104, 104, 104, 104, 104, 104, 173, 173, 104, 104, 104, 104, 104, 104,
				173, 173, 104, 104, 104, 104, 104, 104, 173, 173, 104, 104, 104, 104,
				104, 173, 173, 173, 104, 104, 104, 104, 104, 173, 173, 173, 104, 104,
				104, 104, 104, 173, 173, 173, 104, 104, 104, 104, 104, 104, 173, 173,
				173, 173, 173, 173, 173, 173, 173, 173
			],
			[
				0, 0, 0, 0, 0, 0, 241, 242, 0, 0, 0, 0, 0, 0, 264, 265, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 219, 219, 220, 0, 0, 0, 0, 0, 242, 242, 243, 0, 0, 0, 0, 0
			],
			[
				0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 16, 16, 21, 0, 0, 0, 0, 16, 16, 16, 16,
				0, 0, 0, 0, 20, 16, 16, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0,
				20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 0
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
					const isSolid = tile === 40 || tile === 41
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
	let tileAtlas
	renderable((props) => {
		const { context, width, height } = props
		// context.clearRect(0, 0, width, height)
		function drawLayer(layer) {
			for (let r = 0; r < map.rows; r++) {
				for (let c = 0; c < map.cols; c++) {
					const tile = map.getTile(layer, c, r)
					if (tile !== 0) {
						// 0 => empty tile
						const tileVal = tile - 1
						const sW = map.tsize // source w
						const sH = map.tsize // source h
						const sY = Math.floor(tileVal / map.atlasCols) * map.tsize
						const sX = (tileVal % map.atlasCols) * map.tsize
						const tX = c * map.tsize // target x
						const tY = r * map.tsize // target y
						const tW = map.tsize // target w
						const tH = map.tsize // target h
						context.drawImage(tileAtlas, sX, sY, sW, sH, tX, tY, tW, tH)
					}
				}
			}
		}
		Promise.all([
			Loader.loadImage('tiles', '/img/tile_gb5.png'),
			Loader.loadImage('tower', '/img/tower.png')
		]).then(() => {
			tileAtlas = Loader.getImage('tower')
			drawLayer(0)
			drawLayer(1)
			drawLayer(2)
		})
	})
</script>

<!-- The following allows this component to nest children -->
<slot />
