var zmq = require('zmq')

var socket = zmq.socket('dealer')

socket.identity = 'client' + process.pid;

var messages = 0
var sent = 0

socket.bind('tcp://127.0.0.1: ' + process.argv[2], function(err) {
	if (err) throw err

	console.log('bound!')

	setInterval(function() {
		for (var i = 0; i < 100000; i++) {
			sent++

			socket.send(sent)
		}
	}, 1000)


	socket.on('message', function(data) {
		messages++
	})
});

setTimeout(function () {
	console.log('dealer-s: %d m/sec', sent / 20)
	console.log('dealer-r: %d m/sec', messages / 20)
	process.exit(0)
}, 20000)