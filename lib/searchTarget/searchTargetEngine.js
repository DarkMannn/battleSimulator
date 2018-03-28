const getVehicleInfo = {

	health(vehicle) {
		return vehicle.health + vehicle.operators.reduce((sum, operator) => sum + operator.health, 0);
	},

	experience(vehicle) {
		return vehicle.operators.reduce((sum, operator) => sum + operator.experience, 0);
	}

};

const getSquadInfo = {

	health(squad) {
		return squad.units.reduce((sum, unit) =>
			sum + (unit.type === 'soldier' ? unit.health : getVehicleInfo.health(unit)), 0);
	},

	experience(squad) {
		return squad.units.reduce((sum, unit) =>
			sum + (unit.type === 'soldier' ? unit.experience : getVehicleInfo.experience(unit)), 0) / squad.units.length;
	},

	numbers(squad) {
		return squad.units.length;
	},

	damage(squad) {
		return squad.calculateDamage();
	}

};

const calculatorEngine = {

	random(enemySquads) {
		const randomEnemySquadIndex = Math.floor(Math.random() * enemySquads.length);
		return enemySquads[randomEnemySquadIndex];
	},

	weakest(enemySquads, prioritizationArray) {

		let bestTarget;
		const prioritization = [...prioritizationArray];
		let currentPriority = prioritization.pop();
		let currentPriorityExtreme = getSquadInfo[currentPriority](enemySquads[0]);
		const equalExtremesQueue = [enemySquads[0]];

		enemySquads.forEach((squad, squadIndex) => {

			if (getSquadInfo[currentPriority](squad) < currentPriorityExtreme) {
				equalExtremesQueue.length = 0;
				currentPriorityExtreme = getSquadInfo[currentPriority](squad);
			}
			if (getSquadInfo[currentPriority](squad) <= currentPriorityExtreme) {
				equalExtremesQueue.push(squad);
			}

		});

		// if there is only one squad that matches the criteria return
		if (equalExtremesQueue.length === 1) {
			bestTarget = equalExtremesQueue[0];
			return bestTarget;
		}

		// if there are more than one, compare further
		while (prioritization.length) {

			currentPriority = prioritization.pop();

			equalExtremesQueue.sort((squadA, squadB) =>
				getSquadInfo[currentPriority](squadA) - getSquadInfo[currentPriority](squadB)
			);
			currentPriorityExtreme = getSquadInfo[currentPriority](equalExtremesQueue[0]);
			equalExtremesQueue.filter(squad =>
				getSquadInfo[currentPriority](squad) === currentPriorityExtreme
			);

			if (equalExtremesQueue.length === 1 || !prioritization.length) {
				bestTarget = equalExtremesQueue[0];
				break;
			}

		}

		return bestTarget;

	},

	strongest(enemySquads, prioritizationArray) {

		let bestTarget;
		const prioritization = [...prioritizationArray];
		let currentPriority = prioritization.pop();
		let currentPriorityExtreme = getSquadInfo[currentPriority](enemySquads[0]);
		const equalExtremesQueue = [enemySquads[0]];

		enemySquads.forEach((squad, squadIndex) => {

			if (getSquadInfo[currentPriority](squad) > currentPriorityExtreme) {
				equalExtremesQueue.length = 0;
				currentPriorityExtreme = getSquadInfo[currentPriority](squad);
			}
			if (getSquadInfo[currentPriority](squad) >= currentPriorityExtreme) {
				equalExtremesQueue.push(squad);
			}

		});

		// if there is only one squad that matches the criteria return
		if (equalExtremesQueue.length === 1) {
			bestTarget = equalExtremesQueue[0];
			return bestTarget;
		}

		// if there are more than one, compare further
		while (prioritization.length) {

			currentPriority = prioritization.pop();

			equalExtremesQueue.sort((squadA, squadB) =>
				getSquadInfo[currentPriority](squadB) - getSquadInfo[currentPriority](squadA)
			);
			currentPriorityExtreme = getSquadInfo[currentPriority](equalExtremesQueue[0]);
			equalExtremesQueue.filter(squad =>
				getSquadInfo[currentPriority](squad) === currentPriorityExtreme
			);

			if (equalExtremesQueue.length === 1 || !prioritization.length) {
				bestTarget = equalExtremesQueue[0];
				break;
			}

		}

		return bestTarget;

	},

};

function findTarget(enemySquads, strategy, prioritization) {
	return calculatorEngine[strategy](enemySquads, prioritization);
};

module.exports = findTarget;
