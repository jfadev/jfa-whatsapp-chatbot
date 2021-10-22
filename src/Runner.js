const prompt = require('prompt-sync')({ sigint: true })

const Config = require('./Config')
const Helpers = require('./Helpers')

// const Interface = require('./Interface')

class Runner {
	constructor(args, options) {
		this.options = options || {}
		this.args = args || []
		this.log = Helpers.logger(options.debug)
	}

	async welcome() {
		try {
			this.log.load('Generating welcome message')

			const name = this.args
			this.log.debug(name)

			const message = `Hello ${ name }!`
			this.log.succeed(message)
		} catch (err) {
			this.log.fail(err.message)
			this.log.debug(err)
		}
	}

	async ask() {
		try {
			this.log.debug('Asking user for input')

			const answer = prompt(`Yes? (y/n): `)

			if (answer === 'y') {
				this.log.succeed('YES!')
			} else {
				this.log.fail('no...')
			}
		} catch (err) {
			this.log.fail(err.message)
			this.log.debug(err)
		}
	}

	async api() {
		try {
			this.log.load('Querying API')

			const config = await Config.load(this.options)
			this.log.debug(config)

			// const API = new Interface(config.apiKey)

			const data = '' // await API.getData()

			this.log.succeed(data)
		} catch (err) {
			this.log.fail(err.message)
			this.log.debug(err)
		}
	}

	outputConfig() {
		this.log.load('Loading config')
		const config = Config.load(this.options)

		this.log.info(`Config stored at: ${ config.configPath }`)
		this.log.text(config)
	}
}

module.exports = Runner