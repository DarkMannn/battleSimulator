const squad = require('./squad');

const strategies = ['random', 'weakest', 'strongest'];

let armyProto = {

	_defaultSquads: 2,
	
	spawnSquad(number, ...unitsArr) {
		if (this._defaultSquads > 0) {
			this.squads.shift();
			this._defaultSquads--;
		}
		this.squads.push(squad(number, ...unitsArr));
	}

};

let army = function(team, chosenStrategy, {health, experience, numbers, damage} = {}) {

	let squads = [];
	squads.push(squad());
	squads.push(squad());

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

	return Object.assign(
		Object.create(armyProto), {
			team,
			strategy,
			squads,
			prioritization
		}
	);
};

module.exports = army;
