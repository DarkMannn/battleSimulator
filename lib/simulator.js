let {Red, Blue} = require('./formations/teams');
let buffer = require('./buffer');
let queue = require('./priorityQueue');
let {fork} = require('child_process');
let targetCalculatorProcess = fork('./lib/targetCalculator/targetCalculator.js', {execArgv: ['--inspect=9227']});

let startSimulation = function() {

	let enemyOf = {
		Red: Blue,
		Blue: Red
	};

	console.log('Preparing battlefield...');

	let priorityQueue = queue(Red, Blue);
	let preAttackBuffer = buffer(targetCalculatorProcess, Red, Blue);

	priorityQueue.forEach(squad => {
		setInterval(() => preAttackBuffer.add(squad), squad.recharge);
	});

	setTimeout(() => preAttackBuffer.sendToTargetCalculator(), priorityQueue[0].recharge + 100);

	console.log('Let the battle commence.');

	targetCalculatorProcess.on('message', target => {

		let attackingSquad = preAttackBuffer.remove();
		let defendingSquad = enemyOf[attackingSquad.team].armies[target.army].squads[target.squad];

		if (attackingSquad.hitProbability() > defendingSquad.hitProbability()) {
			let damage = attackingSquad.inflictDamage();
			defendingSquad.receiveDamage(damage);
			console.log(`${attackingSquad.number}.squad of the attacking army from team ${attackingSquad.team} ` +
				`has inflicted ${damage} damage to ${defendingSquad.number}. quad of the defending army from ${defendingSquad.team} team`);
		}

		[Red, Blue].forEach(team => {
			if (!team.isStillStanding) {
				console.log(`${team.team} id defeated!`);
				console.log(`${enemyOf[team.team]} has won the battle!`);
				process.exit(1);
			}
		});

		preAttackBuffer.sendToTargetCalculator();

	});
};

module.exports = {
	Red,
	Blue,
	startSimulation
};
