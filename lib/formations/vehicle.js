const Unit = require('./unit');
const Soldier = require('./soldier');

class Vehicle extends Unit {

	constructor(recharge) {
		if (
			(Number.isInteger(recharge) && (recharge <= 1000 || recharge >= 2000)) ||
			!Number.isInteger(recharge)
		) {
			recharge = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
		}
		
		super(recharge);
		this.type = 'vehicle';
		this.operators = [];
		
		let oneToThreeRandom = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
		
		while (oneToThreeRandom) {
			this.operators.push(new Soldier());
			oneToThreeRandom--;
		}
	}

	calculateDamage()	{
		return 0.1 + this.operators.reduce((sum, operator) => sum + operator.experience / 100, 0);
	}

	receiveDamage(amount) {
		const numOfPeople = this.operators.length;
		const randomOperator = Math.floor(Math.random() * numOfPeople);

		this.health -= amount * 0.3;
		this.operators[randomOperator].receiveDamage(amount * 0.5);

		if (numOfPeople === 1) {
			this.health -= amount * 0.2;
		} else if (numOfPeople === 2) {
			this.operators[(randomOperator + 1) % numOfPeople].receiveDamage(amount * 0.2);
		} else if (numOfPeople === 3) {
			this.operators[(randomOperator + 1) % numOfPeople].receiveDamage(amount * 0.1);
			this.operators[(randomOperator + 2) % numOfPeople].receiveDamage(amount * 0.1);
		}

		this.checkForSurvivals();
	}

	checkForSurvivals() {
		this.operators = this.operators
			.map(soldier => (soldier.isActive ? soldier : false))
			.filter(soldier => soldier);
		if (this.health <= 0 || this.operators.length === 0) {
			this.isActive = false;
			this.operators.length = 0;
		}
	}

	hitProbability() {
		return 0.5 * (1 + this.health / 100) *
			(this.operators.reduce((product, soldier) => product * soldier.hitProbability(), 1) **
			(1 / this.operators.length));
	}

	increaseExperience() {
		this.operators.forEach(operator => operator.increaseExperience());
	}

}

module.exports = Vehicle;
