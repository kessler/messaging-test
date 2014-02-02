var axon = require('axon')
var sock = axon.socket('req')

sock.bind('tcp://127.0.0.1:' + process.argv[2])

sock.on('bind', function() {
	console.log('bound')
})

var received = 0
var sent = 0
function onRes(res){
	received++
}

setInterval(function () {

	for (var i = 0; i < 100000; i++) {
		sent++
		sock.send(i.toString(), onRes)
	}

}, 1000)

setTimeout(function () {
	console.log('client-s: %d m/sec', sent / 20)
	console.log('client-r: %d m/sec', received / 20)
	process.exit(0)
}, 20000)
