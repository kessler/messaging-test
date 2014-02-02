var axon = require('axon')
var sock = axon.socket('rep')

sock.connect('tcp://127.0.0.1:' + process.argv[2])

var received = 0

sock.on('message', function(img, reply){
	received++
	reply(img);
});

setTimeout(function () {

	console.log('server-r: %d m/sec', received)

}, 20000)