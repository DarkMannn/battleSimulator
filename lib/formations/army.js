const squad = require('./squad');

const strategies = ['random', 'weakest', 'strongest'];

let armyProto = {

	_defaultSquads: 0,
	
	spawnSquad(number, ...unitsArr) {
		if (this._defaultSquads > 0) {
			this.squads.shift();
			this._defaultSquads--;
		}
		this.squads.push(Object.assign(
			squad(number, ...unitsArr),
			{
				strategy: this.strategy,
				prioritization: [...this.prioritization],
				team: this.team,
				number: this.squads.length + 1
			}
		));
	},

	isStillStanding() {
		this.checkForSurvivals();
		return this.squads.length;
	},

	checkForSurvivals() {
		this.squads = this.squads.map(squad => squad.isActive ? squad : false).filter(squad => squad);
	}

};

let army = function(team, chosenStrategy, {health, experience, numbers, damage} = {}) {

	let squads = [];

	let strategy = chosenStrategy ? chosenStrategy.toLowerCase() : null;
	if (!strategies.includes(strategy)) {
		strategy = strategies[Math.floor(Math.random() * 3)];
	}

	let prioritization = [];

	if (strategy !== 'random') {
		
		let priorityMap = {
			health: Number.isInteger(health) ? health : 0,
			experience: Number.isInteger(experience) ? experience : 0,
			numbers: Number.isInteger(numbers) ? numbers : 0,
			damage: Number.isInteger(damage) ? damage : 0
		};

		prioritization = Object.getOwnPropertyNames(priorityMap);

		let checksum = prioritization.reduce((sum, priority) => sum + priorityMap[priority], 0);

		if (checksum === 0) {
			if (strategy === 'weakest') prioritization = ['experience', 'damage', 'numbers', 'health'];
			else if (strategy === 'strongest') prioritization = ['health', 'numbers', 'experience', 'damage'];
		} else {
			prioritization.sort((a, b) => priorityMap[a] - priorityMap[b]);
		}
		
	}

	let newArmy = Object.assign(
		Object.create(armyProto), {
			team,
			strategy,
			squads,
			prioritization
		}
	);

	newArmy.spawnSquad();
	newArmy.spawnSquad();
	newArmy._defaultSquads = 2;

	return newArmy;

};

module.exports = army;
