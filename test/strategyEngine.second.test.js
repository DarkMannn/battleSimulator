let findTarget = require('../lib/strategyEngine');
let {Red, Blue} = require('../lib/formations/teams');

for (let i = 0; i < 3; i++) {
	let army = Red.spawnArmy();
	for (let j = 1; j <= 3; j++) {
		army.spawnSquad(2 * j + i, {type: 'soldier', experience: 3 * j + 3 * i});
	}
}

let maxNumbers = {army: 0, squad: 0};
Red.armies.forEach((army, aIndex) => {
	army.squads.forEach((squad, sIndex) => {
		if (Red.armies[aIndex].squads[sIndex].units.length > Red.armies[maxNumbers.army].squads[maxNumbers.squad].units.length) {
			maxNumbers.army = aIndex;
			maxNumbers.squad = sIndex;
		}
	});
});

let armyBlue3 = Blue.spawnArmy('strongest', {numbers: 4});

let res3 = findTarget(Red, armyBlue3);

test('if strategy engine finds targets properly -> second test', () => {

	expect(res3).toEqual(maxNumbers);

});
