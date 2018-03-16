let {Red, Blue} = require('./formations/teams');
let searchTarget = require('./searchTarget/searchTargetEngine');
let preAttackBuffer = require('./helper/buffer');
let queue = require('./helper/priorityQueue');

let startSimulation = function() {

	let enemyOf = {
		Red: Blue,
		Blue: Red
	};

	let fightStillOn = function() {
		return [Red, Blue].every(team => team.isStillStanding());
	};

	console.log('Preparing battlefield...');

	let priorityQueue = queue(Red, Blue);

	priorityQueue.forEach(squad => {
		preAttackBuffer.setRechargeTimer(squad);
	});

	console.log('Let the battle commence.');

	while (fightStillOn()) {

		if (!preAttackBuffer.hasNext()) continue;

		let attackingSquad = preAttackBuffer.remove();
		let {targetArmy, targetSquad} = searchTarget(enemyOf[attackingSquad.team], attackingSquad.strategy, attackingSquad.prioritization);
		let defendingSquad = enemyOf[attackingSquad.team].armies[targetArmy].squads[targetSquad];

		if (attackingSquad.hitProbability() > defendingSquad.hitProbability()) {
			let damage = attackingSquad.inflictDamage();
			defendingSquad.receiveDamage(damage);
			console.log(`${attackingSquad.number}.squad of the attacking army from team ${attackingSquad.team} ` +
				`has inflicted ${damage} damage to ${defendingSquad.number}.squad of the ${targetArmy + 1}. army from` +
				`${defendingSquad.team} team`);
		}
	
	}
	
	[Red, Blue]
	.filter(team => team.isStillStanding())
	.forEach(winningTeam => {
			console.log(`${enemyOf[winningTeam.team]} is defeated!`);
			console.log(`${winningTeam.team} has won the battle!`);
	});

};

module.exports = {
	Red,
	Blue,
	startSimulation
};
