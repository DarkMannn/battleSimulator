let soldier = require('./soldier');

let vehicleProto = {

	health: 100,
	isActive: true,

	inflictDamage()	{
		return 0.1 + this.operators.reduce((sum, operator) => sum + operator.experience, 0) / 100;
	},

	receiveDamage(amount) {
		let numOfPeople = this.operators.length;
		let randomOperator = Math.floor(Math.random() * numOfPeople);

		this.health -= amount * 0.3;
		this.operators[randomOperator].health -= amount * 0.5;

		if (numOfPeople === 1) this.health -= amount * 0.2;
		else if (numOfPeople === 2) this.operators[(randomOperator + 1) % numOfPeople].health -= amount * 0.2;
		else if (numOfPeople === 3) {
			this.operators[(randomOperator + 1) % numOfPeople].health -= amount * 0.1;
			this.operators[(randomOperator + 2) % numOfPeople].health -= amount * 0.1;
		}

		this.checkForSurvivals();
	},

	checkForSurvivals() {
		this.operators = this.operators.map(soldier => soldier.isActive ? soldier : false).filter(soldier => soldier);
		if (this.operators.length === 0) this.isActive = false;
	},

	hitProbability() {
		return 0.5 * (1 + this.health / 100) *
			(this.operators.reduce((product, soldier) => product * soldier.hitProbability(), 1) ** (1 / this.operators.length));
	}

};

let vehicle = function(recharge, ...operatorsAttributes) {

	if (!(Number.isInteger(recharge) && recharge >= 1100 && recharge <= 2000)) {
		recharge = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
	}

	let operators = operatorsAttributes.map(operator => soldier(operator.recharge, operator.experience));

	if (operators.length > 3) operators.length = 3;
	if (operators.length < 3) {
		while (operators.length < 3) operators.push(soldier());
	}
	
	return Object.assign(
		Object.create(vehicleProto), {
			recharge,
			operators
		}
	);

};

module.exports = vehicle;
