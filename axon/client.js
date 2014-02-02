var config = require('../config')
var axon = require('axon')
var socket = axon.socket('req')

process.on('uncaughtException', function () {
	console.log('client error')
	console.log(arguments)
})

socket.connect('tcp://127.0.0.1:' + config.port)

var dropped = 0

socket.on('drop', function () {
	dropped++
})

socket.on('connect', function() {
	console.log('connected ' + config.port)
})

var received = 0
var sent = 0
function onRes(res){
	received++
}

var ref = setInterval(function () {

	for (var i = 0; i < config.batch; i++) {
		sent++
		socket.send(sent.toString(), onRes)
	}

}, config.interval)

setTimeout(function () {
	clearInterval(ref)

	console.log('client-s: %d m/sec', sent / (config.duration / 1000))
	console.log('client-r: %d m/sec', received / (config.duration / 1000))
	console.log('client-d: %d', dropped)
	process.exit(0)

}, config.duration)
