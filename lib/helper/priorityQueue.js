function getPriorityQueue(...armies) {
	
	const priorityQueue = [];
			
	armies.forEach((army) => {
		army.squads.forEach((squad) => {
			priorityQueue.push(squad);
		});
	});

	priorityQueue.sort((a, b) => a.recharge - b.recharge);
	
	let advantageTeamIndex = Math.floor(Math.random() * armies.length);
	
	for (let i = 0; i < priorityQueue.length - 2; i++) {
		const first = priorityQueue[i];
		const second = priorityQueue[i + 1];
		if (first.recharge === second.recharge && first.army.name !== second.army.name) {
			if (second.name === advantageTeamIndex + 1) {
				[priorityQueue[i], priorityQueue[i + 1]] = [second, first];
				advantageTeamIndex = (advantageTeamIndex++) % armies.length;
			}
		}
	}

	return priorityQueue;

};

module.exports = getPriorityQueue;
