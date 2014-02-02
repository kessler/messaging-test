var axon = require('axon')
var sock = axon.socket('req')

sock.bind('tcp://127.0.0.1:3001')

var received = 0

function onRes(res){
	received++
}

setInterval(function () {
	console.log(received)
	received = 0

}, 1000)

setInterval(function () {

	for (var i = 0; i < 100000; i++) {
		sock.send(i.toString(), onRes)
	}


}, 1000)
