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

let army = function(team, chosenStrategy) {

	let squads = [];
	squads.push(squad());
	squads.push(squad());

	let strategy = chosenStrategy ? chosenStrategy.toLowerCase() : null;
	if (!strategies.includes(strategy)) {
		strategy = strategies[Math.floor(Math.random() * 3)];
	}

	return Object.assign(
		Object.create(armyProto), {
			team,
			strategy,
			squads
		}
	);
};

module.exports = army;
