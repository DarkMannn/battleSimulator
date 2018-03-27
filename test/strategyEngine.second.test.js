const findTarget = require('../lib/searchTarget/searchTargetEngine');
const Army = require('../lib/formations/army');

const armies = [];

for (let i = 0; i < 5; i++) {
	const army = new Army();
	for (let j = 1; j <= 5; j++) {
		army.spawnSquad(i + 1, i + 1);
	}
	armies.push(army);
}

let squadWithMaxNumbers = armies[0].squads[0];
armies.forEach((army) => {
	army.squads.forEach((squad) => {
		if (squad.units.length > squadWithMaxNumbers.units.length) {
			squadWithMaxNumbers = squad;
		}
	});
});

let squadWithMinNumbers = armies[0].squads[0];
armies.forEach((army) => {
	army.squads.forEach((squad) => {
		if (squad.units.length < squadWithMinNumbers.units.length) {
			squadWithMinNumbers = squad;
		}
	});
});

const army1 = new Army('strongest', { numbers: 4 });
const army2 = new Army('weakest', { numbers: 4 });

const squads = [];
armies.forEach(army => squads.push(...army.squads));

const target1 = findTarget(squads, army1.strategy, army1.prioritization);
const target2 = findTarget(squads, army2.strategy, army2.prioritization);

test('if strategy engine finds targets properly -> second test', () => {

	expect(target1.units.length).toEqual(squadWithMaxNumbers.units.length);
	expect(target2.units.length).toEqual(squadWithMinNumbers.units.length);

});
