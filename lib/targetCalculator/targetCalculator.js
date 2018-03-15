let findTarget = require('./calculatorEngine');


process.on('message', data => {

	switch (data.message) {

		case 'getTarget':
			let army, squad;
			if (data.prioritization.length) {
				{army, squad} = strategies.find.bestTarget(data.enemyArmy, data.prioritization);
			}
			else {
				{army, squad} = strategies.find.randomTarget()
			}
			process.send({army, squad});
			break;

	}

});
