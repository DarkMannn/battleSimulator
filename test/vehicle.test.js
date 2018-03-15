let vehicle = require('../lib/formations/vehicle');

let vehicleA = vehicle(300);
let vehicleB = vehicle();
let vehicleC = vehicle(1300, {recharge: 200, experience: 5});
let vehicleD = vehicle(2001, {notRecharge: 300, notExperience: 6});

test('vehicle factory function random number generator', () => {
	
	expect(vehicleA.recharge).toBeGreaterThanOrEqual(1000);
	expect(vehicleA.recharge).toBeLessThanOrEqual(2000);

	expect(vehicleB.recharge).toBeGreaterThanOrEqual(1000);
	expect(vehicleB.recharge).toBeLessThanOrEqual(2000);

	expect(vehicleC.recharge).toBe(1300);
	
	expect(vehicleD.recharge).not.toBe(2001);
	expect(vehicleD.recharge).toBeGreaterThanOrEqual(1000);
	expect(vehicleD.recharge).toBeLessThanOrEqual(2000);

});

test('vehicle factory function operators count', () => {

	expect(vehicleA.operators.length).toBeGreaterThanOrEqual(1);
	expect(vehicleA.operators.length).toBeLessThanOrEqual(3);
	expect(vehicleB.operators.length).toBeGreaterThanOrEqual(1);
	expect(vehicleB.operators.length).toBeLessThanOrEqual(3);
	expect(vehicleC.operators.length).toBeGreaterThanOrEqual(1);
	expect(vehicleC.operators.length).toBeLessThanOrEqual(3);

});

test('default and custom operators attributes', () => {

	vehicleC.operators.forEach(operator => {
		expect(operator.recharge).toBe(200);
		expect(operator.experience).toBe(5);
	});

	vehicleD.operators.forEach(operator => {
		expect(operator.recharge).not.toBe(300);
		expect(operator.experience).not.toBe(6);
	});

});

test('if inflicted damage is calculated corectly', () => {

	let groupDamageVehicleA = 0;
	let	groupDamageVehicleB = 0;
	vehicleA.operators.forEach(operator => groupDamageVehicleA += operator.experience / 100);
	vehicleB.operators.forEach(operator => groupDamageVehicleB += operator.experience / 100);

	expect(vehicleA.inflictDamage()).toBe(0.1 + groupDamageVehicleA);
	expect(vehicleB.inflictDamage()).toBe(0.1 + groupDamageVehicleB);

});

test('if still active although killed', () => {

	let vehicleE = vehicle();
	vehicleE.receiveDamage(500);
	expect(vehicleE.operators.length).toBe(0);
	expect(vehicleE.isActive).toBeFalsy();

});

test('if experience is increased to all operators', () => {

	let vehicleF = vehicle();
	let operatorsExpArray = vehicleF.operators.map(operator => operator.experience);
	vehicleF.increaseExperience();
	expect(vehicleF.operators.map(operator => operator.experience)).toEqual(operatorsExpArray.map(opExp => opExp !== 50 ? opExp + 1 : opExp));

});
