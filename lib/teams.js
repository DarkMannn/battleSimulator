const army = require('./army');

let teamProto = {

	_defaultArmies: 2,

	spawnArmy(strategy) {
		if (this._defaultArmies > 0) {
			this.armies.shift();
			this._defaultArmies--;
		}
		this.armies.push(army(this, strategy));
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
Red.armies.push(army(this));
Red.armies.push(army(this));
Red._defaultArmies = 2;

let Blue = team('Blue');
Blue.armies.push(army(this));
Blue.armies.push(army(this));
Blue._defaultArmies = 2;

module.exports = {
	Red,
	Blue
};
