var axon = require('axon')
var sock = axon.socket('rep')

sock.connect('tcp://127.0.0.1:3001')

var received = 0

setInterval(function () {
	console.log(received)
	received = 0
}, 1000)

sock.on('message', function(img, reply){
	received++
	reply(img);
});