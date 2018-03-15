let army = require('../lib/formations/army');

let armyA = army('Red');
let armyB = army('Blue', 'some unknown strategy', {health: 4});
let armyC = army('Green', 'weakest', {health: 3, experience: 6});
let armyD = army('Green', 'random', {health: 3, experience: 6});
let armyE = army('Green', 'strongest', {health: 0, experience: 0, numbers: 0, damage: 0});

test('if army factory generates valid squads', () => {
	
	expect(armyA.squads.length).toBe(2);

	expect(armyB.strategy === 'random' || armyB.strategy === 'weakest' || armyB.strategy === 'strongest').toBeTruthy();
	let counter = 23;
	while (counter) {
		armyB.spawnSquad();
		counter--;
	}
	expect(armyB.squads.length).toBe(23);
	expect(armyB.team).toBe('Blue');
	
	expect(armyC.strategy).toBe('weakest');
	armyC.spawnSquad();
	armyC.spawnSquad();
	expect(armyC.squads.length).toBe(2);
	expect(armyC.prioritization[3]).toBe('experience');
	expect(armyC.squads[0].prioritization[3]).toBe('experience');
	expect(armyC.prioritization[2]).toBe('health');
	expect(armyC.squads[0].prioritization[2]).toBe('health');
	
	expect(armyD.prioritization.length).toBe(0);
	
	expect(armyE.prioritization).toEqual(['health', 'numbers', 'experience', 'damage']);

});
