const getArmiesAndSquads = require('../lib/helper/getOrderedSquads');
const Army = require('../lib/formations/army');

const army1 = new Army();
const army2 = new Army();
const army3 = new Army();
const army4 = new Army();
const army5 = new Army();

const squadsQueue = getArmiesAndSquads([army5, army1, army4, army3, army2]);

test('if squads are ordered according to recharge time', () => {

	const squadsOrderedProperly = squadsQueue.every((squad, i, arr) => {
		if (i === arr.length - 1) return true;
		return squad.recharge <= arr[i + 1].recharge;
	});
	expect(squadsOrderedProperly).toBeTruthy();

});

