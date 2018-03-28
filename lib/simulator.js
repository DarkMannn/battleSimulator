const searchTarget = require('./searchTarget/searchTargetEngine');
const getOrderedSquads = require('./helper/getOrderedSquads');
const preAttackBuffer = require('./helper/buffer');

function startSimulation(...armiesRest) {

	let armies = armiesRest;
	const squadsQueue = getOrderedSquads(armiesRest);
	const atLeastTwoArmies = () => armies.length >= 2;
	const discardDefeatedArmies = () => armies = armies.filter(army => army.isStillStanding());
	const aBit = () => new Promise((res, rej) => setTimeout(res, 100));

	console.log('Preparing battlefield...');

	squadsQueue.forEach((squad) => {
		squad.interval = setInterval((squadInner) => {
			if (squadInner.isActive) {
				preAttackBuffer.add(squadInner);
			} else {
				clearInterval(squadInner.interval);
			}
		}, squad.recharge, squad);
	});

	console.log('Let the battle commence.');

	(async function battleLoop() {

		while (atLeastTwoArmies()) {

			if (!preAttackBuffer.hasNext()) {
				await aBit();
				continue;
			}

			const attackingSquad = preAttackBuffer.remove();
			
			const enemySquads = [];
			// separate only enemy squads
			armies.forEach((army) => {
				if (army.name !== attackingSquad.army.name) enemySquads.push(...army.squads);
			});

			const targetSquad = searchTarget(
				enemySquads,
				attackingSquad.army.strategy,
				attackingSquad.army.prioritization
			);

			if (attackingSquad.hitProbability() > targetSquad.hitProbability()) {

				attackingSquad.inflictDamage(targetSquad);

				console.log([
					`${attackingSquad.name}.squad of the attacking ${attackingSquad.army.name}.army`,
					`has inflicted ${attackingSquad.calculateDamage().toFixed(2)} damage to ${targetSquad.name}.squad`,
					`of the ${targetSquad.army.name}.army.`
				].join(' '));

				discardDefeatedArmies();
			}

		}

		console.log([
			'THE BATTLE IS OVER!',
			`${armies[0].name}.ARMY HAS WON THE BATTLE!`
		].join(' '));

	})();

};

module.exports = startSimulation;
