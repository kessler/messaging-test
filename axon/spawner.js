var port = process.argv[2]

var child = require('child_process');

fork('client', process.cwd(), [ port ])
fork('server', process.cwd(), [ port ])

function fork(what, cwd, args) {
	console.log('fork: ', what, cwd, args);
	return child.fork(what, process.argv.slice(3).concat(args),  { cwd: cwd });
}