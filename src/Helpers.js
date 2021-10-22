const ora = require('ora')

const logger = (debugMode) => {
	const spinner = ora()

	const load = (text) => {
		if (text) spinner.text = text
		spinner.start()
	}

	const info = (text) => {
		spinner.info(text)
	}

	const warn = (text) => {
		spinner.warn(` ${ text }`)
	}

	const succeed = (text) => {
		spinner.succeed(` ${ text }`)
	}

	const fail = (text) => {
		spinner.fail(` ${ text }`)
	}

	const clear = () => {
		spinner.clear()
	}

	const text = (text) => {
		spinner.stop()
		console.log(text)
	}

	const stop = (text) => {
		if (text) {
			spinner.text = text
			spinner.stopAndPersist()
			return
		}

		spinner.stop()
	}

	const debug = (text) => {
		if (debugMode) {
			spinner.clear()
			console.log(text)
			spinner.render()
		}
	}

	const changeText = (text) => {
		spinner.text = text
		debug(text)
	}

	return {
		load,
		changeText,
		text,
		info,
		warn,
		fail,
		debug,
		clear,
		succeed,
		stop
	}
}

module.exports = {
	logger
}