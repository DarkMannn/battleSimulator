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

	random(enemyTeam) {
		const randomArmy = Math.floor(Math.random() * enemyTeam.armies.length);
		const randomArmySquad = Math.floor(Math.random() * enemyTeam.armies[randomArmy].squads.length);
		return {
			targetArmy: randomArmy,
			targetSquad: randomArmySquad
		};
	},

	weakest(enemyTeam, prioritizationArray) {

		let bestTargetArmy;
		let bestTargetArmySquad;
		const prioritization = [...prioritizationArray];
		const currentPriority = prioritization.pop();
		const currentPriorityExtreme = getSquadInfo[currentPriority](enemyTeam.armies[0].squads[0]);
		const equalExtremesQueue = [{ squad: enemyTeam.armies[0].squads[0], armyIndex: 0, squadIndex: 0 }];

		enemyTeam.armies.forEach((army, armyIndex) => {

			army.squads.forEach((squad, squadIndex) => {

				if (getSquadInfo[currentPriority](squad) < currentPriorityExtreme) {
					equalExtremesQueue.length = 0;
					currentPriorityExtreme = getSquadInfo[currentPriority](squad);
				}
				if (getSquadInfo[currentPriority](squad) <= currentPriorityExtreme) {
					equalExtremesQueue.push({
						squad,
						armyIndex,
						squadIndex
					});
				}
			});

		});

		if (equalExtremesQueue.length === 1) {
			return {
				targetArmy: equalExtremesQueue[0].armyIndex,
				targetSquad: equalExtremesQueue[0].squadIndex
			};
		}

		while (prioritization.length) {

			currentPriority = prioritization.pop();

			equalExtremesQueue.sort((a, b) => getSquadInfo[currentPriority](a.squad) - getSquadInfo[currentPriority](b.squad));
			currentPriorityExtreme = getSquadInfo[currentPriority](equalExtremesQueue[0].squad);
			equalExtremesQueue.filter(squad => getSquadInfo[currentPriority](squad.squad) === currentPriorityExtreme);

			if (equalExtremesQueue.length === 1 || !prioritization.length) {
				bestTargetArmy = equalExtremesQueue[0].armyIndex;
				bestTargetArmySquad = equalExtremesQueue[0].squadIndex;
				break;
			}

		}

		return {
			targetArmy: bestTargetArmy,
			targetSquad: bestTargetArmySquad
		};

	},

	strongest(enemyTeam, prioritizationArray) {

		let bestTargetArmy;
		let bestTargetArmySquad;
		const prioritization = [...prioritizationArray];
		const currentPriority = prioritization.pop();
		const currentPriorityExtreme = getSquadInfo[currentPriority](enemyTeam.armies[0].squads[0]);
		const equalExtremesQueue = [{ squad: enemyTeam.armies[0].squads[0], armyIndex: 0, squadIndex: 0 }];

		enemyTeam.armies.forEach((army, armyIndex) => {

			army.squads.forEach((squad, squadIndex) => {

				if (getSquadInfo[currentPriority](squad) > currentPriorityExtreme) {
					equalExtremesQueue.length = 0;
					currentPriorityExtreme = getSquadInfo[currentPriority](squad);
				}
				if (getSquadInfo[currentPriority](squad) >= currentPriorityExtreme) {
					equalExtremesQueue.push({
						squad,
						armyIndex,
						squadIndex
					});
				}
			});

		});

		if (equalExtremesQueue.length === 1) {
			return {
				targetArmy: equalExtremesQueue[0].armyIndex,
				targetSquad: equalExtremesQueue[0].squadIndex
			};
		}

		while (prioritization.length) {

			currentPriority = prioritization.pop();

			equalExtremesQueue.sort((a, b) => getSquadInfo[currentPriority](b.squad) - getSquadInfo[currentPriority](a.squad));
			currentPriorityExtreme = getSquadInfo[currentPriority](equalExtremesQueue[0].squad);
			equalExtremesQueue.filter(squad => getSquadInfo[currentPriority](squad.squad) === currentPriorityExtreme);

			if (equalExtremesQueue.length === 1 || !prioritization.length) {
				bestTargetArmy = equalExtremesQueue[0].armyIndex;
				bestTargetArmySquad = equalExtremesQueue[0].squadIndex;
				break;
			}

		}

		return {
			targetArmy: bestTargetArmy,
			targetSquad: bestTargetArmySquad
		};

	}

};

const findTarget = function(enemyTeam, strategy, prioritization) {
	return calculatorEngine[strategy](enemyTeam, prioritization);
};

module.exports = findTarget;
