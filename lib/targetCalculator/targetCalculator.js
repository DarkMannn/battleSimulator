let findTarget = require('./calculatorEngine');

console.log('Target calculator subprocess has started...');

process.on('message', data => {

	let target = findTarget(data.enemy, data.strategy, data.prioritization);
	process.send(target);

});
