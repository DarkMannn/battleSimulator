let soldier = require('./soldier');
let vehicle = require('./vehicle');

//total squad health, experience per unit, number of units, total squad damage

let strategies = {
	random(squadArray) {
		return squadArray[Math.floor(Math.random() * squadArray.length)];
	},
	weakest() {
		
	},
	strongest() {
	
	}
};

let squadProto = {

	isActive: true;

	inflictDamage() {
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
		return this.units.reduce((hitProbProduct, unit) => hitProbProduct * unit.hitProbability, 1) **
			   (1 / this.units.length);
	}

};

let squad = function(chosenStrategy, army, ...units) {
	let chosenStrategy = chosenStrategy.toLowerCase();
	if (!strategy.contains(chosenStrategy)) {
		chosenStrategy = strategy[Math.floor(Math.random() * 3)];
	}

	return Object.assign(
			   Object.create(squadProto), {
				   strategy: chosenStrategy
			   }
		   );
}