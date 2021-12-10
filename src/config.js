const Configstore = require('configstore')
require('dotenv').config()

const packageJson = require('../package.json')
const config = new Configstore(packageJson.name, {})

const getEnv = (key) => {
	const envKey = key.toUpperCase()
	return process.env[envKey]
}

const load = function(required = false) {
	// Get the value for the given key; order: env variable, stored value, default value or error
	const getValue = (key, defaultVal) => {
		const env = getEnv(key)
		if (env !== undefined) return env

		const stored = config.get(key)
		if (stored) return stored

		if (defaultVal !== undefined) return defaultVal

		if (required) {
			throw new Error(`Option ${ key } not specified`)
		}
	}

	const finalConfig = {
		iftttKey: getValue('ifttt_key', undefined),
		eventName: getValue('event_name', 'pushterm'),
		conf: config
	}

	return finalConfig
}

module.exports = {
	load
}