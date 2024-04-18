export class Generator {
	constructor(name, cost, input, output, n = 0) {
		this.name = name
		this.cost = cost
		this.input = input
		this.output = output
		this.n = n
	}
	generate(resources) {
		if (this.n === 0) return resources
		let out = Object.assign({}, resources)
		let failed = false
		let minDiv = Infinity
		//calculate the minimum divisor, so you can consume UP TO n * input cost, not requiring n * input cost
		//probably not standard for incremental games, but what the hell
		Object.keys(this.input).forEach((key) => {
			let div = Math.floor(out[key] / this.input[key])
			//console.log(div, minDiv, this.n, Math.min(div, this.n))
			if (div < 1) {
				failed = true
				return false
			}
			if (div < minDiv) {
				minDiv = Math.min(div, this.n)
			}
		})
		if (!failed) {
			Object.keys(this.input).forEach((key) => {
				out[key] -= minDiv * this.input[key]
			})
			Object.keys(this.output).forEach((key) => {
				out[key] = out[key]
					? out[key] + minDiv * this.output[key]
					: minDiv * this.output[key]
			})
		}
		return failed ? resources : out
	}
}
