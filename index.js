const Army = require('./lib/formations/army');
const startSimulation = require('./lib/simulator');

const army1 = new Army();
const army2 = new Army();

startSimulation(army1, army2);
