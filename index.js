const Army = require('./lib/formations/army');
const startSimulation = require('./lib/simulator');

/**
 * Create armies here
 */
const army1 = new Army();
const army2 = new Army();
const army3 = new Army();

/**
 * Just pass them in the startSimulation function
 */
startSimulation(army1, army2, army3);
