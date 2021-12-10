#!/usr/bin/env node

const program = require('commander')
const packageJson = require('../package.json')
const Runner = require('./runner')

program
	.version(packageJson.version, '-v, --version')
	.description(packageJson.description)
	.addHelpText('before', `${ packageJson.name } v${ packageJson.version }\n`)
	.addHelpText('after', `\nBy ${ packageJson.author }\n${ packageJson.homepage } - ${ packageJson.license } License`)

program
	.option('-d, --debug', 'enable debug mode', false)
	.option('-i, --interactive', 'use interactive mode', false)

program
	.arguments('message')
	.option('-m, --message <value>', 'notification message')
	.option('-t, --title <value>', 'notification title', 'Pushterm')
	.option('-l, --link <value>', 'link to open when clicking notification')
	.action((options, cmd) => {
		if (!options.message && !options.interactive && cmd.args.length === 0) {
			program.help()
		}

		const runner = new Runner(options, cmd.args)
		runner.send()
	})

program
	.command('send')
	.description('Send a push notification')
	.arguments('message')
	.option('-m, --message <value>', 'notification message')
	.option('-t, --title <value>', 'notification title', 'Pushterm')
	.option('-l, --link <value>', 'link to open when clicking notification')
	.action((options, cmd) => {
		const runner = new Runner({ ...cmd.parent.opts(), ...options }, cmd.args)
		runner.send()
	})

program
	.command('setup')
	.description('Setup Pushterm')
	.action((options, cmd) => {
		const runner = new Runner({ ...cmd.parent.opts(), ...options })
		runner.setup()
	})

program
	.command('config')
	.description('Output current config')
	.action((options, cmd) => {
		const runner = new Runner({ ...cmd.parent.opts(), ...options })
		runner.outputConfig()
	})

program
	.command('help')
	.description('Display this help text')
	.action(() => {
		program.help()
	})

program.on('command:*', (operands) => {
	console.error(`error: unknown command '${ operands[0] }'\n`)
	program.help()
})

program.parse(process.argv)