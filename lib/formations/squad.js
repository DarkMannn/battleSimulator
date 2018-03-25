const soldier = require('./soldier');
const vehicle = require('./vehicle');

const squadProto = {

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
		this.units = this.units.map(unit => (unit.isActive ? unit : false)).filter(unit => unit);
	},

	hitProbability() {
		return this.units.reduce((hitProbProduct, unit) => hitProbProduct * unit.hitProbability(), 1)
			** (1 / this.units.length);
	},

	increaseExperience() {
		this.units.forEach(unit => unit.increaseExperience());
	},

	calculateSquadRechargeTime() {
		let { recharge } = this.units[0];
		this.units.forEach((unit) => { if (unit.recharge > recharge) recharge = unit.recharge; });
		this.recharge = recharge;
	},

};

const squad = function squad(number, ...unitsArr) {

	const units = [];

	if (!Number.isInteger(number)) number = 0;

	while (number) {
		unitsArr.forEach((att) => {
			const {
				type,
				recharge,
				experience,
				operators
			} = att;
			if (type === 'vehicle') units.push(vehicle(recharge, operators));
			else if (type === 'soldier') units.push(soldier(recharge, experience));
		});
		if (units.length === 10) break;
		number--;
	}

	if (units.length < 5) {

		const type = ['soldier', 'vehicle'];
		while (units.length < 5) {
			if (type[Math.floor(Math.random() * 2)] === 'soldier') units.push(soldier());
			else units.push(vehicle());
		}

	}

	const newSquad = Object.assign(Object.create(squadProto), {
			units,
		});

	newSquad.calculateSquadRechargeTime();

	return newSquad;

};

module.exports = squad;
