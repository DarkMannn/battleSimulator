const Army = require('../lib/formations/army');

const armyA = new Army();
const armyB = new Army('some unknown strategy', { health: 4 });
const armyC = new Army('weakest', { health: 3, experience: 6 });
const armyD = new Army('random', { health: 3, experience: 6 });
const armyE = new Army('strongest', { health: 0, experience: 0, numbers: 0, damage: 0 });

test('if army class generates valid squads', () => {
	
	expect(armyA.name).toBe(1);
	expect(armyB.name).toBe(2);
	expect(armyC.name).toBe(3);
	expect(armyD.name).toBe(4);
	expect(armyE.name).toBe(5);
	
	expect(armyA.squads.length).toBe(2);

	expect(
		armyB.strategy === 'random' ||
		armyB.strategy === 'weakest' ||
		armyB.strategy === 'strongest'
	).toBeTruthy();
	armyB.spawnSquads(23);
	expect(armyB.squads.length).toBe(23);
	expect(armyB.isStillStanding()).toBeTruthy();
	
	expect(armyC.strategy).toBe('weakest');
	armyC.spawnSquad();
	armyC.spawnSquad();
	expect(armyC.squads.length).toBe(2);
	expect(armyC.prioritization[3]).toBe('experience');
	expect(armyC.prioritization[3]).toBe('experience');
	expect(armyC.prioritization[2]).toBe('health');
	expect(armyC.prioritization[2]).toBe('health');
	
	expect(armyD.prioritization.length).toBe(0);
	
	expect(armyE.prioritization).toEqual(['health', 'numbers', 'experience', 'damage']);
	expect(armyE.isStillStanding()).toBeTruthy();

});
