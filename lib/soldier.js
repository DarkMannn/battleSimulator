let soldierProto = {

	health: 100,
	isActive: true,

	inflictDamage() {
		return 0.05 + this.experience / 100;
	},

	receiveDamage(amount) {
		this.health -= amount;
		if (this.health <= 0) return this.isActive = false;
	},

	hitProbability() {
		return 0.5 * (1 + this.health / 100) * (Math.floor(Math.random() * (100 - (30 + this.experience) + 1)) + 30 + this.experience) / 100;
	},

	increaseExperience() {
		if (this.experience < 50) this.experience++;
	}

};

let soldier = function(recharge, experience) {
	
	if (!(Number.isInteger(recharge) && recharge >= 100 && recharge <= 2000)) {
		recharge = Math.floor(Math.random() * (2000 - 100 + 1)) + 100;
	}
	if (!(Number.isInteger(experience) && experience >= 0 && experience <= 50)) {
		experience = Math.floor(Math.random() * (50 + 1));
	}

	return Object.assign(
		Object.create(soldierProto), {
			recharge,
			experience
		}
	);

};

module.exports = soldier;