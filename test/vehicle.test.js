let vehicle = require('../lib/vehicle');

let vehicleA = vehicle(300);
let vehicleB = vehicle();
let vehicleC = vehicle(1300, {recharge: 200, experience: 5});
let vehicleD = vehicle(2001, {recharge: 200, experience: 5}, {recharge: 700, experience: 35}, {recharge: 600, experience: 40});

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

	expect(vehicleA.operators.length).toBe(3);
	expect(vehicleB.operators.length).toBe(3);
	expect(vehicleC.operators.length).toBe(3);
	expect(vehicleD.operators.length).toBe(3);

});
