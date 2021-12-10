const got = require('got')
const io = require('./io')

const Config = require('./config')
const logger = require('./log')

class Runner {
	constructor(options, args) {
		this.options = options || {}
		this.args = args || []
		this.log = logger(options.debug)

		this.log.debug(this.options)
		this.log.debug(this.args)
	}

	async send() {
		try {
			this.log.load('Validating config')
			const config = await Config.load(true)

			this.log.debug(config)
			this.log.stop()

			let message = this.args[0] || this.options.message
			let title = this.options.title
			let link = this.options.link

			if (!message) {
				message = await io.input('Enter a message')
				if (!message) return this.log.fail('No message provided')
			}

			if (this.options.interactive) {
				title = await io.input('Enter a title')
				link = await io.input('Enter a link URL')
			}

			const baseUrl = new URL(`https://maker.ifttt.com/trigger/${ config.eventName }/with/key/${ config.iftttKey }`)

			baseUrl.searchParams.append('value1', message)

			if (title) baseUrl.searchParams.append('value2', title)
			if (link) baseUrl.searchParams.append('value3', link)

			this.log.debug(baseUrl.toString())
			this.log.load('Sending push notification...')

			const res = await got.get(baseUrl.toString())
			this.log.debug(res.body)

			this.log.succeed('Push notification sent!')
		} catch (err) {
			this.log.fail(err.message)
			this.log.debug(err)
		}
	}

	async setup() {
		try {
			this.log.debug('Loading config')
			const config = await Config.load()
			this.log.debug(config)

			this.log.info('Starting Pushterm setup')

			this.log.divider()

			if (config.iftttKey) {
				this.log.warn('Pushterm is already setup.')
				const overwrite = await io.confirm('Overwrite the current config? (y/n)')

				if (!overwrite) return
				this.log.divider()
			}

			this.log.text('For Pushterm to work, it needs to know which IFTTT webhook to call.')
			this.log.text('This requires you to specify an IFTTT webhook key.')
			this.log.text(`\nYou can find your webhook key at: ${ this.log.chalk.cyan('https://ifttt.com/maker_webhooks/settings') }`)

			this.log.divider()

			const iftttKey = await io.input('Enter your IFTTT Webhook Key', 'password')
			if (!iftttKey) return this.log.fail('No API key provided')

			config.conf.set({ ifttt_key: iftttKey })

			this.log.divider()

			this.log.info('By default Pushterm will use "pushterm" as the webhook event name.\n')
			const overwrite = await io.confirm('Do you want to overwrite it? (y/n)')
			if (overwrite) {
				const eventName = await io.input('Enter the event name')
				if (!eventName) return this.log.fail('No event name provided')

				config.conf.set({ event_name: eventName })
			} else {
				config.conf.set('event_name', 'pushterm')
			}

			this.log.divider()

			this.log.succeed('Setup complete!')

		} catch (err) {
			this.log.fail(err.message)
			this.log.debug(err)
		}
	}

	outputConfig() {
		this.log.load('Loading config')
		const config = Config.load()

		this.log.info(`Config stored at: ${ config.conf.path }`)

		this.log.divider()

		delete config.conf
		this.log.text(config)

		this.log.divider()
	}
}

module.exports = Runner