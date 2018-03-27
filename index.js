const { Red, Blue, startSimulation } = require('./lib/simulator');

const armyRed = Red.spawnArmy('strongest', { health: 4, experience: 3 });
armyRed.spawnSquad(3, { type: 'soldier', recharge: 300, experience: 20 });
Red.spawnArmy();
Red.spawnArmy();
Red.spawnArmy();

const armyBlue = Blue.spawnArmy('weakest', { damage: 3 });
armyBlue.spawnSquad(10, { type: 'vehicle', operators: { recharge: 300, experience: 20 } });
Blue.spawnArmy();
Blue.spawnArmy();
Blue.spawnArmy();

startSimulation();
