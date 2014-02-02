var zmq = require('zmq')

var socket = zmq.socket('dealer')

socket.identity = 'client' + process.pid;

var value = 0;
var messages = 0
var sent = 0

setInterval(function () {
	console.log(messages, sent)
	messages = 0
	sent = 0
}, 1000)

socket.bind('tcp://127.0.0.1: ' + process.argv[2], function(err) {
	if (err) throw err

	console.log('bound!')

	setInterval(function() {
		for (var i = 0; i < 100000; i++) {
			sent++
			value++

			socket.send(process.pid + '-' + value)
		}
	}, 1000)


	socket.on('message', function(data) {
		messages++
	})
});