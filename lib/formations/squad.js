const Soldier = require('./soldier');
const Vehicle = require('./vehicle');

class Squad {

	constructor(soldierConfig, vehicleConfig) {
		let soldierNumber;
		let vehicleNumber;
		
		this.isActive = true;
		this.units = [];

		if (typeof soldierConfig !== 'undefined') {
			if (Number.isInteger(soldierConfig)) soldierNumber = soldierConfig;
			else if (Number.isInteger(soldierConfig.number)) soldierNumber = soldierConfig.number;
			else soldierNumber = 0;
		}
		
		if (typeof vehicleConfig !== 'undefined') {
			if (Number.isInteger(vehicleConfig)) vehicleNumber = vehicleConfig;
			else if (Number.isInteger(vehicleConfig.number)) vehicleNumber = vehicleConfig.number;
			else vehicleNumber = 0;
		}

		while (soldierNumber) {
			if (this.units.length === 10) break;
			this.units.push(new Soldier(soldierConfig.recharge, soldierConfig.experience));
			soldierNumber--;
		}
	
		while (vehicleNumber) {
			if (this.units.length === 10) break;
			this.units.push(new Vehicle(vehicleConfig.recharge));
			vehicleNumber--;
		}

		if (this.units.length < 5) {
			while (this.units.length < 5) {
				const randomUnitClass = ['Soldier', 'Vehicle'][Math.floor(Math.random() * 2)];
				if (randomUnitClass === 'Soldier') {
					this.units.push(new Soldier());
				} else {
					this.units.push(new Vehicle());
				}
			}
		}
		
		this.recharge = this.units
			.reduce((max, unit) => unit.recharge > max ? unit.recharge : max, this.units[0].recharge);
	
	}

	inflictDamage(targetSquad) {
		targetSquad.receiveDamage(this.calculateDamage());
		this.increaseExperience();
	}
	
	calculateDamage() {
		return this.units.reduce((damageSum, unit) => damageSum + unit.calculateDamage(), 0);
	}

	receiveDamage(damage) {
		this.units.forEach(unit => unit.receiveDamage(damage / this.units.length));
		this.checkForSurvivals();
		if (this.units.length === 0) this.isActive = false;
	}

	checkForSurvivals() {
		this.units = this.units.filter(unit => unit.isActive);
	}

	hitProbability() {
		return this.units.reduce((hitProbProduct, unit) => hitProbProduct * unit.hitProbability(), 1) **
			(1 / this.units.length);
	}

	increaseExperience() {
		this.units.forEach(unit => unit.increaseExperience());
	}

};

module.exports = Squad;
