var port = process.argv[2]

var child = require('child_process');

fork('client', process.cwd())
fork('server', process.cwd())

function fork(what, cwd, args) {
	console.log('fork: ', what, cwd);
	return child.fork(what, process.argv.slice(2).concat(args),  { cwd: cwd });
}