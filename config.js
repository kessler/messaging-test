var rc = require('rc')

module.exports = rc('messaging-test', {
	duration: 11000,
	batch: 20000,
	interval: 1000,
	port: 7171
})