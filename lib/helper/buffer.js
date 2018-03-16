let buffer = function() {

	let data = [];

	return {

		add(squad) {
			data.unshift(squad);
		},

		remove() {
			return data.pop();
		},

		hasNext() {
			return data.length > 0;
		}

	};

};

module.exports = buffer();