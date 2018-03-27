const searchTarget = require('./searchTarget/searchTargetEngine');
const getArmiesAndSquads = require('./helper/armiesAndSquadsGetter');
const preAttackBuffer = require('./helper/buffer');

function startSimulation(...armiesRest) {

	const { armies, squadsQueue } = getArmiesAndSquads(armiesRest);

	const atLeastTwoArmies = () => armies.length >= 2;

	const discardDefeatedArmies = () => armies.filter(army => army.isStillStanding());

	const aBit = () => new Promise((res, rej) => setTimeout(res, 200));

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
			armies.forEach((army, index) => {
				if (index !== attackingSquad.army.name) enemySquads.push(...army.squads);
			});
			const targetSquad = searchTarget(
				enemySquads,
				attackingSquad.army.strategy,
				attackingSquad.army.prioritization
			);

			if (attackingSquad.hitProbability() > targetSquad.hitProbability()) {

				attackingSquad.inflictDamage(targetSquad);

				console.log(`${attackingSquad.name}.squad of the attacking ${attackingSquad.army.name}.army
					has inflicted ${attackingSquad.calculateDamage().toFixed(2)} damage to ${targetSquad.name}.squad 
					of the ${targetSquad.army.name}.army.`);

				discardDefeatedArmies();
			}

		}

		console.log(`THE BATTLE IS OVER!
			${armies[0].name}.ARMY HAS WON THE BATTLE!`);

	})();

};

module.exports = startSimulation;
