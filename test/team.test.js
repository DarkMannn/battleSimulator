let {Red, Blue} = require('../lib/teams');

test('if teams have valid defaults', () => {

	expect(Red.armies.length === 2).toBeTruthy();
	expect(Blue.armies.length === 2).toBeTruthy();
	
});

test('if team factory generates valid armies', () => {
	
	let army1 = Red.spawnArmy();
	let army2 = Red.spawnArmy();
	expect(Red.armies.length === 2).toBeTruthy();
	expect(army1.team).toEqual(Red);

	let counter = 23;
	while (counter) {
		Blue.spawnArmy();
		counter--;
	}
	expect(Blue.armies.length).toBe(23);

});
