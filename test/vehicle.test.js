let Vehicle = require('../lib/formations/vehicle');

let vehicleA = new Vehicle(300);
let vehicleB = new Vehicle();
let vehicleC = new Vehicle(1300);
let vehicleD = new Vehicle(2001);

test('Vehicle class random recharge generator', () => {
	
	expect(vehicleA.recharge).toBeGreaterThanOrEqual(1000);
	expect(vehicleA.recharge).toBeLessThanOrEqual(2000);

	expect(vehicleB.recharge).toBeGreaterThanOrEqual(1000);
	expect(vehicleB.recharge).toBeLessThanOrEqual(2000);

	expect(vehicleC.recharge).toBe(1300);
	
	expect(vehicleD.recharge).not.toBe(2001);
	expect(vehicleD.recharge).toBeGreaterThanOrEqual(1000);
	expect(vehicleD.recharge).toBeLessThanOrEqual(2000);

});

test('Vehicle class random operators count', () => {

	expect(vehicleA.operators.length).toBeGreaterThanOrEqual(1);
	expect(vehicleA.operators.length).toBeLessThanOrEqual(3);
	expect(vehicleB.operators.length).toBeGreaterThanOrEqual(1);
	expect(vehicleB.operators.length).toBeLessThanOrEqual(3);
	expect(vehicleC.operators.length).toBeGreaterThanOrEqual(1);
	expect(vehicleC.operators.length).toBeLessThanOrEqual(3);

});

test('if inflicted damage is calculated corectly', () => {

	let groupDamageVehicleA = 0;
	let	groupDamageVehicleB = 0;
	vehicleA.operators.forEach(operator => groupDamageVehicleA += operator.experience / 100);
	vehicleB.operators.forEach(operator => groupDamageVehicleB += operator.experience / 100);

	expect(vehicleA.calculateDamage()).toBe(0.1 + groupDamageVehicleA);
	expect(vehicleB.calculateDamage()).toBe(0.1 + groupDamageVehicleB);

});

test('if still active although killed', () => {

	let vehicleE = new Vehicle();
	vehicleE.receiveDamage(500);
	expect(vehicleE.operators.length).toBe(0);
	expect(vehicleE.isActive).toBeFalsy();

});

test('if experience is increased to all operators', () => {

	let vehicleF = new Vehicle();
	let operatorsExpArray = vehicleF.operators.map(operator => operator.experience);
	vehicleF.increaseExperience();
	expect(vehicleF.operators.map(operator => operator.experience)).toEqual(operatorsExpArray.map(opExp => opExp !== 50 ? opExp + 1 : opExp));

});
