var axon = require('axon')
var sock = axon.socket('rep')

sock.connect('tcp://127.0.0.1:' + process.argv[2])

sock.on('connect', function() {
	console.log('connected')
})


var received = 0

sock.on('message', function(img, reply){
	received++
	reply(img);
});

setTimeout(function () {
	sock.close(function () {
		console.log('server-r: %d m/sec', received / 20)
		process.exit(0)
	})
}, 20000)