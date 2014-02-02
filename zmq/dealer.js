var config = require('../config.js')
var zmq = require('zmq')

var socket = zmq.socket('dealer')

socket.identity = 'client' + process.pid;

var messages = 0
var sent = 0

socket.bind('tcp://127.0.0.1: ' + config.port, function(err) {
	if (err) throw err

	console.log('bound! %d', config.port)

	setInterval(function() {
		for (var i = 0; i < config.batch; i++) {
			sent++
			socket.send(sent)
		}
	}, config.interval)


	socket.on('message', function(data) {
		messages++
	})
});

setTimeout(function () {
	console.log('dealer-s: %d m/sec', sent / (config.duration / 1000))
	console.log('dealer-r: %d m/sec', messages / (config.duration / 1000))
	process.exit(0)
}, config.duration)