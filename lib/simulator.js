let {Red, Blue} = require('./formations/teams');
let buffer = require('./buffer');
let queue = require('./priorityQueue');
let {fork} = require('child_process');
let targetCalculatorProcess = fork('./targetCalculator/targetCalculator.js');

let startSimulation = function() {

	let enemyOf = {
		Red: Blue,
		Blue: Red
	};

	console.log('Preparing battlefield...');

	let priorityQueue = queue();
	let preAttackBuffer = buffer(targetCalculatorProcess, Red, Blue);

	priorityQueue.forEach(squad => {
		setInterval(() => preAttackBuffer.add(squad), squad.recharge);
	});

	targetCalculatorProcess.on('message', target => {
		let attackingSquad = preAttackBuffer.remove();
		let defendingSquad = enemyOf[attackingSquad.team].armies[target.army].squads[target.squad];
		if (attackingSquad.hitProbability() > defendingSquad.hitProbability()) {
			defendingSquad.receiveDamage(attackingSquad.inflictDamage());
		}
		// check if someone dead in the queue
		// check if enemy is dead
		preAttackBuffer.sendToTargetCalculator();
	});
};

module.exports = {
	Red,
	Blue,
	startSimulation
};
