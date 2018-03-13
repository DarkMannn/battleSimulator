let army = require('../lib/army');

let armyA = army('Red');
let armyB = army('Blue', 'some unknown strategy');
let armyC = army('Green', 'weakest');

test('if army factory generates valid squads', () => {
	
	expect(armyA.squads.length).toBe(2);

	expect(armyB.strategy === 'random' || armyB.strategy === 'weakest' || armyB.strategy === 'strongest').toBeTruthy();
	let counter = 23;
	while (counter) {
		armyB.spawnSquad();
		counter--;
	}
	expect(armyB.squads.length).toBe(23);
	
	expect(armyC.strategy).toBe('weakest');
	armyC.spawnSquad();
	armyC.spawnSquad();
	expect(armyC.squads.length).toBe(2);

});
