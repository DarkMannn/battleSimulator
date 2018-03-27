function getArmiesAndSquads(armies) {
	
	const armiesOrdered = armies.sort((armyA, armyB) => armyA.name - armyB.name);

	const squadPriorityQueue = [];
	
	armies.forEach((army) => {
		army.squads.forEach((squad) => {
			squadPriorityQueue.push(squad);
		});
	});

	squadPriorityQueue.sort((squadA, squadB) => squadA.recharge - squadB.recharge);
	
	let advantageTeamIndex = Math.floor(Math.random() * armies.length);
	
	for (let i = 0; i < squadPriorityQueue.length - 2; i++) {
		const first = squadPriorityQueue[i];
		const second = squadPriorityQueue[i + 1];
		if (first.recharge === second.recharge && first.army.name !== second.army.name) {
			if (second.name === advantageTeamIndex + 1) {
				[squadPriorityQueue[i], squadPriorityQueue[i + 1]] = [second, first];
				advantageTeamIndex = (advantageTeamIndex++) % armies.length;
			}
		}
	}

	return {
		armies: armiesOrdered,
		squadsQueue: squadPriorityQueue
	};

};

module.exports = getArmiesAndSquads;
