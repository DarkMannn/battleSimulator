let squad = require('../lib/formations/squad');

let squadA = squad();
let squadB = squad(4);
let squadC = squad(6, {type: 'soldier', recharge: 300, experience: 3});
let squadD = squad(4, {type: 'soldier', recharge: 300, experience: 50}, {type: 'vehicle', operators: {recharge: 300, experience: 50}});
let squadE = squad(48, {type: 'soldier', recharge: 300, experience: 3});
let squadF = squad(11, {type: 'vehicle'}, {type: 'soldier'});
let squadG = squad('Not a number');

test('if squad factory generates valid units', () => {

	expect(squadA.units.length).toBe(5);

	expect(squadB.units.length).toBe(5);

	expect(squadC.units.length).toBe(6);
	expect(squadC.units.every(unit => unit.type === 'soldier')).toBeTruthy();

	expect(squadD.units.length).toBe(8);
	expect(squadD.units.reduce((sum, unit) => sum + (unit.type === 'soldier' ? 1 : 0), 0)).toBe(4);
	expect(squadD.units.reduce((sum, unit) => sum + (unit.type === 'vehicle' ? 1 : 0), 0)).toBe(4);
	
	expect(squadE.units.length).toBe(10);

	expect(squadF.units.length).toBe(10);

	expect(squadG.units.length).toBe(5);

});

test('squad prototype methods', () => {

	let damageSum = 0;
	squadD.units.forEach(unit => damageSum += unit.inflictDamage());
	expect(squadD.inflictDamage()).toBe(damageSum);

	squadG.receiveDamage(4000);
	expect(squadG.isActive).toBeFalsy();

	let sumExperience = 0;
	squadE.units.forEach(unit => sumExperience += unit.experience);
	squadE.increaseExperience();
	expect(squadE.units.reduce((sum, unit) => sum + unit.experience, 0)).toBe(sumExperience + squadE.units.length);

});
