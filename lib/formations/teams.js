const army = require('./army');

let teamProto = {

	_defaultArmies: 0,

	spawnArmy(strategy, prioritization) {
		if (this._defaultArmies > 0) {
			this.armies.shift();
			this._defaultArmies--;
		}
		this.armies.push(army(this.team, strategy, prioritization));
		return this.armies[this.armies.length - 1];
	}

};

let team = function(teamName) {

	let armies = [];

	return Object.assign(
		Object.create(teamProto),
		{
			team: teamName,
			armies
		}
	);
};

let Red = team('Red');
Red.spawnArmy();
Red.spawnArmy();
Red._defaultArmies = 2;

let Blue = team('Blue');
Blue.spawnArmy();
Blue.spawnArmy();
Blue._defaultArmies = 2;

module.exports = {
	Red,
	Blue
};
