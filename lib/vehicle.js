let soldier = require('./soldier');

let vehicleProto = {

	type: 'vehicle',
	health: 100,
	isActive: true,

	inflictDamage()	{
		return 0.1 + this.operators.reduce((sum, operator) => sum + operator.experience / 100, 0);
	},

	receiveDamage(amount) {
		let numOfPeople = this.operators.length;
		let randomOperator = Math.floor(Math.random() * numOfPeople);

		this.health -= amount * 0.3;
		this.operators[randomOperator].receiveDamage(amount * 0.5);

		if (numOfPeople === 1) this.health -= amount * 0.2;
		else if (numOfPeople === 2) this.operators[(randomOperator + 1) % numOfPeople].receiveDamage(amount * 0.2);
		else if (numOfPeople === 3) {
			this.operators[(randomOperator + 1) % numOfPeople].receiveDamage(amount * 0.1);
			this.operators[(randomOperator + 2) % numOfPeople].receiveDamage(amount * 0.1);
		}

		this.checkForSurvivals();
	},

	checkForSurvivals() {
		this.operators = this.operators.map(soldier => soldier.isActive ? soldier : false).filter(soldier => soldier);
		if (this.health <= 0 || this.operators.length === 0) {
			this.isActive = false;
			this.operators.length = 0;
		}
	},

	hitProbability() {
		return 0.5 * (1 + this.health / 100) *
			(this.operators.reduce((product, soldier) => product * soldier.hitProbability(), 1) ** (1 / this.operators.length));
	},

	increaseExperience() {
		this.operators.forEach(operator => operator.increaseExperience());
	}

};

let vehicle = function(recharge, operatorsAttributes) {

	let operators = [];
	let oneToThreeRandom = Math.floor(Math.random() * (3 - 1 + 1)) + 1;

	let rechargeOfOperators = operatorsAttributes && 'recharge' in operatorsAttributes ? operatorsAttributes.recharge : null;
	let experienceOfOperators = operatorsAttributes && 'experience' in operatorsAttributes ? operatorsAttributes.experience : null;
	
	if (!(Number.isInteger(recharge) && recharge >= 1000 && recharge <= 2000)) {
		recharge = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
	}
	
	while (oneToThreeRandom) {
		operators.push(soldier(rechargeOfOperators, experienceOfOperators));
		oneToThreeRandom--;
	}

	return Object.assign(
		Object.create(vehicleProto),
		{
			recharge,
			operators
		}
	);

};

module.exports = vehicle;
