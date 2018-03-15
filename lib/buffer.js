let preAttackBuffer = function(targetCalculatorProcess, Red, Blue) {

	let data = [];

	let enemyOf = {
		Red: Blue,
		Blue: Red
	};

	return {

		add(squad) {
			data.unshift(squad);
		},

		peekNextSquad() {
			return data[data.length - 1];
		},

		sendToTargetCalculator() {
			targetCalculatorProcess.send({
				enemy: enemyOf[this.peekNextSquad().team],
				strategy: this.peekNextSquad().strategy,
				prioritization: this.peekNextSquad().prioritization
			});
		},

		remove() {
			return data.pop();
		}

	};

};

module.exports = preAttackBuffer;
