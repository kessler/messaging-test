var config = require('../config.js');
var zmq = require('zmq')
var socket = zmq.socket('router');

socket.identity = 'server' + process.pid;
socket.connect('tcp://127.0.0.1:' + config.port);

console.log('connected! %d', config.port)

var messages = 0

socket.on('message', function(envelope, data) {
	//console.log(socket.identity + ': received ' + envelope + ' - ' + data.toString());
	messages++
	socket.send([envelope, data]);
});


setTimeout(function () {
	console.log('router-r: %d m/sec',messages / (config.duration / 1000))
	process.exit(0)
}, config.duration)