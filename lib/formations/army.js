const Squad = require('./squad');

const strategies = ['random', 'weakest', 'strongest'];
let counter = 0;

class Army {

	constructor(chosenStrategy, { health, experience, numbers, damage } = {}) {
		this.name = Army.assignNumber();
		this.squads = [];
		this.prioritization = [];
		
		this.strategy = chosenStrategy ? chosenStrategy.toLowerCase() : null;
		if (!strategies.includes(this.strategy)) {
			this.strategy = strategies[Math.floor(Math.random() * 3)];
		}
	
		if (this.strategy !== 'random') {
			
			const priorityMap = {
				health: Number.isInteger(health) ? health : 0,
				experience: Number.isInteger(experience) ? experience : 0,
				numbers: Number.isInteger(numbers) ? numbers : 0,
				damage: Number.isInteger(damage) ? damage : 0
			};
			const priorities = Object.getOwnPropertyNames(priorityMap);
			const checksum = priorities.reduce((sum, priority) => sum + priorityMap[priority], 0);
	
			if (checksum === 0) {
				if (this.strategy === 'weakest') {
					this.prioritization = ['experience', 'damage', 'numbers', 'health'];
				} else if (this.strategy === 'strongest') {
					this.prioritization = ['health', 'numbers', 'experience', 'damage'];
				}
			} else {
				priorities.sort((a, b) => priorityMap[a] - priorityMap[b]);
				this.prioritization = priorities;
			}
			
		}
	
		this.spawnSquads(2);
		this._defaultSquads = 2;
	
	}

	spawnSquad(soldierConfig, vehicleConfig) {
		if (this._defaultSquads > 0) {
			this.squads.shift();
			this._defaultSquads--;
		}
		const squad = new Squad(soldierConfig, vehicleConfig);
		squad.army = this;
		this.squads.push(squad);
	}

	spawnSquads(numberWanted) {
		const presentDefaultSquads = Number.isInteger(this._defaultSquads) ? this._defaultSquads : 0;
		let number = numberWanted - presentDefaultSquads;
		while (number) {
			const squad = new Squad();
			squad.army = this;
			this.squads.push(squad);
			number--;
		}
	}

	isStillStanding() {
		this.checkForSurvivals();
		return this.squads.length > 0;
	}

	checkForSurvivals() {
		this.squads = this.squads.map(squad => (squad.isActive ? squad : false)).filter(squad => squad);
	}

	static countArmies() {
		return counter;
	}

	static assignNumber() {
		return ++counter;
	}

}

module.exports = Army;
