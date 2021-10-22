const Configstore = require('configstore')
// const prompt = require('prompt-sync')({ sigint: true })
require('dotenv').config()

const packageJson = require('../package.json')
const config = new Configstore(packageJson.name, {})

const getEnv = (key) => {
	const envKey = key.toUpperCase()
	return process.env[envKey]
}

const toCamel = (s) => {
	return s.replace(/([-_][a-z])/ig, ($1) => {
		return $1.toUpperCase()
			.replace('-', '')
			.replace('_', '')
	})
}

const load = function(options) {

	// Get the value for the given key; order: command line args, env variable, stored value, default value or error
	const getValue = (key, defaultVal) => {
		const optionsKey = toCamel(key)
		if (options[optionsKey]) return options[optionsKey]

		const env = getEnv(key)
		if (env !== undefined) return env

		const stored = config.get(key)
		if (stored) return stored

		if (defaultVal !== undefined) return defaultVal

		throw new Error(`Option ${ key } not specified`)
	}

	const finalConfig = {
		apiKey: getValue('api_key', undefined),
		configPath: config.path
	}

	return finalConfig
}

const getConfigPath = () => {
	return config.path
}

module.exports = {
	load,
	getConfigPath
}