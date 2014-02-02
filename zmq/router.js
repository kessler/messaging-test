var zmq = require('zmq')
var socket = zmq.socket('router');

socket.identity = 'server' + process.pid;

for (var i = 2; i < process.argv.length; i++)
	socket.connect('tcp://127.0.0.1:' + process.argv[i]);

console.log('connected!');

var messages = 0

socket.on('message', function(envelope, data) {
	//console.log(socket.identity + ': received ' + envelope + ' - ' + data.toString());
	messages++
	socket.send([envelope, data]);
});


setTimeout(function () {
	console.log('router-r: %d m/sec',messages / 20)
	process.exit(0)
}, 20000)