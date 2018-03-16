let buffer = function() {

	let data = [];

	return {

		add(squad) {
			this.setRechargeTimer(squad);
			data.unshift(squad);
		},

		remove() {
			return data.pop();
		},
		
		hasNext() {
			return data.length > 0;
		},

		setRechargeTimer(squad) {
			if (squad.isActive) setTimeout(() => this.add(squad), squad.racharge);
		}

	};

};

module.exports = buffer();
