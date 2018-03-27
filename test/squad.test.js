const Squad = require('../lib/formations/squad');

const squadA = new Squad();
const squadB = new Squad(3, 3);
const squadC = new Squad(12, 12);
const squadE = new Squad(
	{ number: 4, recharge: 300 },
	{ number: 4 }
);
const squadD = new Squad(
	{ number: 4, recharge: 300, experience: 50 },
	{ number: 3, recharge: 300 }
);
const squadF = new Squad(
	{ number: 4, recharge: 5000, experience: 50 },
	{ number: 3, recharge: 300 }
);
const squadG = new Squad('Not a number');
const squadH = new Squad(0, 10);

test('if squad class generates valid units', () => {

	expect(squadA.units.length).toBe(5);

	expect(squadB.units.length).toBe(6);

	expect(squadC.units.length).toBe(10);
	expect(squadC.units.every(unit => unit.type === 'soldier')).toBeTruthy();

	expect(squadD.units.length).toBe(7);
	expect(squadD.units.reduce((sum, unit) => sum + (unit.type === 'soldier' ? 1 : 0), 0)).toBe(4);
	expect(squadD.units.reduce((sum, unit) => sum + (unit.type === 'vehicle' ? 1 : 0), 0)).toBe(3);
	
	expect(squadE.units.length).toBe(8);

	expect(squadF.units.length).toBe(7);

	expect(squadG.units.length).toBe(5);
	
	expect(squadH.units.length).toBe(10);

});

test('squad prototype methods', () => {

	let damageSum = 0;
	squadD.units.forEach(unit => damageSum += unit.calculateDamage());
	expect(squadD.calculateDamage()).toBe(damageSum);

	squadG.receiveDamage(4000);
	expect(squadG.isActive).toBeFalsy();

	let sumExperience = 0;
	squadE.units.forEach(unit => sumExperience += unit.experience);
	squadE.increaseExperience();
	expect(squadE.units.reduce((sum, unit) => sum + unit.experience, 0))
		.toBe(sumExperience + squadE.units.length);

});
