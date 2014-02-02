/*
 *
 * One requester two responders (round robin)
 *
 */

var cluster = require('cluster')
    , zeromq = require('zmq')
    , port = 'tcp://127.0.0.1:12345'
    , port2 = 'tcp://127.0.0.1:12346';

if (cluster.isMaster) {
    //Fork servers.
    for (var i = 0; i < 2; i++) {
        cluster.fork();
    }

    cluster.on('death', function(worker) {
        console.log('worker ' + worker.pid + ' died');
    });

    //requester = client

    var value = 0;

    var socket = zeromq.socket('req');

    socket.identity = 'client1_' + process.pid;

    socket.bind(port, function(err) {
        if (err) throw err;
        console.log('bound!');

        setInterval(function() {
            value++
            console.log(socket.identity + ': asking ' + value);
            socket.send(value);
        }, 100);


        socket.on('message', function(data) {
            console.log(socket.identity + ': answer data ' + data);
        });
    });

    var socket2 = zeromq.socket('req');

    socket2.identity = 'client2_' + process.pid;

    socket2.bind(port2, function(err) {
        if (err) throw err;
        console.log('bound!');

        setInterval(function() {
            value++
            console.log(socket.identity + ': asking ' + value);
            socket2.send(value);
        }, 100);


        socket2.on('message', function(data) {
            console.log(socket2.identity + ': answer data ' + data);
        });
    });
} else {
    //responder = server

    var socket = zeromq.socket('rep');

    socket.identity = 'server' + process.pid;

    socket.connect(port);
    socket.connect(port2);
    console.log('connected!');

    socket.on('message', function(data) {
        console.log(socket.identity + ': received ' + data.toString());
        socket.send(data + ' ' + socket.identity);
    });
}