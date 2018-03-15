let findTarget = require('../lib/targetCalculator/calculatorEngine');
let {Red, Blue} = require('../lib/formations/teams');

for (let i = 0; i < 5; i++) {
	let army = Red.spawnArmy();
	for (let j = 1; j <= 5; j++) {
		army.spawnSquad(2 * j, {type: 'soldier', experience: 5 * j + i});
	}
}

let maxDamage = {army: 0, squad: 0};
Red.armies.forEach((army, aIndex) => {
	army.squads.forEach((squad, sIndex) => {
		if (Red.armies[aIndex].squads[sIndex].calculateDamage() > Red.armies[maxDamage.army].squads[maxDamage.squad].calculateDamage()) {
			maxDamage.army = aIndex;
			maxDamage.squad = sIndex;
		}
	});
});

let minDamage = {army: 0, squad: 0};
Red.armies.forEach((army, aIndex) => {
	army.squads.forEach((squad, sIndex) => {
		if (Red.armies[aIndex].squads[sIndex].calculateDamage() < Red.armies[minDamage.army].squads[minDamage.squad].calculateDamage()) {
			minDamage.army = aIndex;
			minDamage.squad = sIndex;
		}
	});
});

let armyBlue1 = Blue.spawnArmy('strongest', {damage: 4});
let armyBlue2 = Blue.spawnArmy('weakest', {damage: 4});

let res1 = findTarget(Red, armyBlue1.strategy, armyBlue1.prioritization);
let res2 = findTarget(Red, armyBlue2.strategy, armyBlue2.prioritization);

test('if strategy engine finds targets properly -> first test', () => {

	expect(res1).toEqual(maxDamage);
	expect(res2).toEqual(minDamage);

});
