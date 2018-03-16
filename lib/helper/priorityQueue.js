let getPriorityQueue = function(Red, Blue) {
	
	let priorityQueueRed = [];
	let priorityQueueBlue = [];
			
	let enemyOf = {
		Red: 'Blue',
		Blue: 'Red'
	};

	Red.armies.forEach(army => {
		army.squads.forEach(squad => {
			priorityQueueRed.push(squad);
		});
	});
	Blue.armies.forEach(army => {
		army.squads.forEach(squad => {
			priorityQueueBlue.push(squad);
		});
	});

	let priorityQueue = [...priorityQueueRed, ...priorityQueueBlue];
	priorityQueue.sort((a, b) => a.recharge - b.recharge);
	
	let advantageTeam = ['Red', 'Blue'][Math.floor(Math.random() * 2)];
	
	for (let i = 0; i < priorityQueue.length - 2; i++) {
		let first = priorityQueue[i];
		let second = priorityQueue[i + 1];
		if (first.recharge === second.recharge && first.team !== second.team) {
			if (second.team === advantageTeam) {
				advantageTeam = enemyOf[advantageTeam];
				[priorityQueue[i], priorityQueue[i + 1]] = [second, first];
			}
		}
	}

	return priorityQueue;

};

module.exports = getPriorityQueue;
