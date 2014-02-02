var config = require('../config')
var axon = require('axon')
var sock = axon.socket('rep')

process.on('uncaughtException', function () {
	console.log('server error')
	console.log(arguments)
})

sock.bind('tcp://127.0.0.1:' + config.port)

sock.on('bind', function() {
	console.log('bound ' + config.port)
})


var received = 0

sock.on('message', function(img, reply){
	received++
	reply(img);
});

setTimeout(function () {

	console.log('server-r: %d m/sec', received / (config.duration / 1000))
	process.exit(0)

}, config.duration)