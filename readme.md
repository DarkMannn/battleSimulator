# Battle simulator
This is a battle simulator. You can simulate battle between two or more armies.

In the index.js file you can configure the armies and squads. There is already a basic setup there.

Every army consists of squads (default = 2). Each squad consists of units that can be soldiers or vehicles (default = 5, min = 5, max = 10). Vehicles are operated by soldiers (min = 1, max = 3).

Squads are the basic, coherent unit that attacks and defends.

```javascript
// @param {string} strategy
// @param {object} priorities
let army1 = new Army('strongest', {health: 1});

// @param {object} soldier configuration
// @param {object} vehicle configuration
army1.spawnSquad(
	{number: 3, recharge: 200, experience: 4},
	{number: 2, recharge: 1399}
);
```
Every army has a strategy. If you don't provide a strategy, random one is picked. Possible strategies are 'random', 'weakest', 'strongest'. Every squad of the same army has the same strategy.

You can provide an object of priorities of what to look for first, when scanning for next target. Criteria consists of health, numbers, experience and damage. You can provide just one or several of them:
```javascript
    let army1 = new Army('strongest');
    let army2 = new Army('weakest', {health:1, experience:2, damage:3, numbers:4});
```
If the strategy is 'weakest' and number one priority is health for instance. Enemy squad with the least ammount of health is picked as a next Target.
If the strategy 'strongest' target with biggest ammount of health will be chosen.
If there are two targets with the same level of first priority attribute, the second attribute is considered and so on.
If you set just the strategy, wheter is 'strongest' or 'weakest' a computer would choose best target according to already set criteria.

Evey squad has certain number of units which have certain attributes. Soldiers have experience and recharge time. Vehicles have recharge time and operators, which have the same attributes as soldiers.

Ways to spawn squad/squads:
```javascript
	// by default army has two default squads
	new Army();

	// spawn a default squad with 5 random units
	army1.spawnSquad();

	// spawn a squad with 6 soldiers
	army2.spawnSquad(6);

	// spawn a squad with 5 vehicles
	army3.spawnSquad(0,5);

	// spawn a squad with 3 soldiers, 2 vehicles and appropriate attributes
	army4.spawnSquad(
		{number: 3, recharge: 200, experience: 4},
		{number: 2, recharge: 1399}
	);

	// spawn 10 default squads
	army5.spawnSquads(10);
```
Every argument is optional, and a random one will be provided so you can just spawn needed number of units and watch them fight.

index.js
```javascript
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


```
