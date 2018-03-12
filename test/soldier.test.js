let soldier = require('../lib/soldier');

let soldierA = soldier(300, 4);
let soldierB = soldier();
let soldierC = soldier(5000, -50);
let soldierD = soldier('230', undefined);

test('Soldier factory functions random number generators', () => {

	expect(soldierA.recharge).toBe(300);
	expect(soldierA.experience).toBe(4);

	expect(soldierB.recharge).toBeGreaterThanOrEqual(100);
	expect(soldierB.recharge).toBeLessThanOrEqual(2000);
	expect(soldierB.experience).toBeGreaterThanOrEqual(0);
	expect(soldierB.experience).toBeLessThanOrEqual(50);

	expect(soldierC.recharge).toBeLessThanOrEqual(2000);
	expect(soldierC.recharge).toBeGreaterThanOrEqual(100);
	expect(soldierC.experience).toBeGreaterThanOrEqual(0);
	expect(soldierC.experience).toBeLessThanOrEqual(50);

	expect(soldierD.recharge).not.toBe(230);
	expect(soldierD.recharge).toBeGreaterThanOrEqual(100);
	expect(soldierD.recharge).toBeLessThanOrEqual(2000);
	expect(soldierD.experience).toBeGreaterThanOrEqual(0);
	expect(soldierD.experience).toBeLessThanOrEqual(50);

});

test('Soldier factory function methods', () => {

	soldierA.receiveDamage(100);
	expect(soldierA.isActive).toBeFalsy();

	soldierB.receiveDamage(200);
	expect(soldierB.isActive).toBeFalsy();

	soldierC.receiveDamage(50);
	expect(soldierC.health).toBe(50);

	let damageInflictedByC = 0.05 + soldierC.experience / 100;
	let hitProbabilityByC = 0.5 * (1 + soldierC.health / 100) *
		(Math.floor(Math.random() * (100 - (30 + soldierC.experience) + 1)) + 30 + soldierC.experience) / 100;
	expect(soldierC.inflictDamage()).toBe(damageInflictedByC);
	expect(soldierC.hitProbability()).not.toBe(hitProbabilityByC);

	let soldierExperience = soldierD.experience;
	soldierD.increaseExperience();
	if (soldierD.experience !== 50) expect(soldierD.experience).toBe(soldierExperience + 1);
	else expect(soldierD.experience).toBe(50);

});
