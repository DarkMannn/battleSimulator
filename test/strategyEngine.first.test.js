const findTarget = require('../lib/searchTarget/searchTargetEngine');
const Army = require('../lib/formations/army');

const armies = [];

for (let i = 0; i < 5; i++) {
	const army = new Army();
	for (let j = 1; j <= 5; j++) {
		army.spawnSquad({ number: 4, experience: 5 * j });
	}
	armies.push(army);
}

let squadWithMaxDamage = armies[0].squads[0];
armies.forEach((army) => {
	army.squads.forEach((squad) => {
		if (squad.calculateDamage() > squadWithMaxDamage.calculateDamage()) {
			squadWithMaxDamage = squad;
		}
	});
});

let squadWithMinDamage = armies[0].squads[0];
armies.forEach((army) => {
	army.squads.forEach((squad) => {
		if (squad.calculateDamage() < squadWithMinDamage.calculateDamage()) {
			squadWithMinDamage = squad;
		}
	});
});

const army1 = new Army('strongest', { damage: 4 });
const army2 = new Army('weakest', { damage: 4 });

const squads = [];
armies.forEach(army => squads.push(...army.squads));

const target1 = findTarget(squads, army1.strategy, army1.prioritization);
const target2 = findTarget(squads, army2.strategy, army2.prioritization);

test('if strategy engine finds targets properly -> first test', () => {

	expect(target1.calculateDamage()).toEqual(squadWithMaxDamage.calculateDamage());
	expect(target2.calculateDamage()).toEqual(squadWithMinDamage.calculateDamage());

});
