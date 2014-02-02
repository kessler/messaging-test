var port = process.argv[2]

var child = require('child_process');

fork('dealer', process.cwd())
fork('router', process.cwd())

function fork(what, cwd, args) {
	console.log('fork: ', what, cwd);
	return child.fork(what, process.argv.slice(2),  { cwd: cwd });
}