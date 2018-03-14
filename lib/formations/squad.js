let soldier = require('./soldier');
let vehicle = require('./vehicle');

let squadProto = {

	isActive: true,

	inflictDamage() {
		this.increaseExperience();
		return this.units.reduce((damageSum, unit) => damageSum + unit.inflictDamage(), 0);
	},
	
	calculateDamage() {
		return this.units.reduce((damageSum, unit) => damageSum + unit.inflictDamage(), 0);
	},

	receiveDamage(damage) {
		this.units.forEach(unit => unit.receiveDamage(damage / this.units.length));
		this.checkForSurvivals();
		if (this.units.length === 0) this.isActive = false;
	},

	checkForSurvivals() {
		this.units = this.units.map(unit => unit.isActive ? unit : false).filter(unit => unit);
	},

	hitProbability() {
		return this.units.reduce((hitProbProduct, unit) => hitProbProduct * unit.hitProbability(), 1) ** (1 / this.units.length);
	},

	increaseExperience() {
		this.units.forEach(unit => unit.increaseExperience());
	}

};

let squad = function(number, ...unitsArr) {

	let units = [];

	if (!Number.isInteger(number)) number = 0;

	while (number) {
		unitsArr.forEach(att => {
			let {type, recharge, experience, operators} = att;
			if (type === 'vehicle') units.push(vehicle(recharge, operators));
			else if (type === 'soldier') units.push(soldier(recharge, experience));
		});
		if (units.length === 10) break;
		number--;
	}

	if (units.length < 5) {

		let type = ['soldier', 'vehicle'];
		while (units.length < 5) {
			if (type[Math.floor(Math.random() * 2)] === 'soldier') units.push(soldier());
			else units.push(vehicle());
		}

	}

	return Object.assign(
		Object.create(squadProto), {
			units
		}
	);
};

module.exports = squad;
