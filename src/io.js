const inquirer = require('inquirer')

const input = async (message, type = 'input') => {
	return new Promise((resolve) => {
		inquirer
			.prompt([
				{
					type: type,
					...(type === 'password' && { mask: '*' }),
					name: 'value',
					message: `${ message }:`
				}
			])
			.then((answers) => {
				resolve(answers.value)
			})
	})
}

const confirm = async (message) => {
	return new Promise((resolve) => {
		inquirer
			.prompt([
				{
					type: 'confirm',
					name: 'value',
					message: message
				}
			])
			.then((answers) => {
				resolve(answers.value)
			})
	})
}

module.exports = {
	input,
	confirm
}