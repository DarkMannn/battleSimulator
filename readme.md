# Battle simulator
This is a battle simulator. You can simulate battle between two opposing teams (Blue and Red).

In the index.js file you can configure the teams and/or their armies and squads. There is already a basic setup there.

Every team consists of armies (default = 2). And every army of squads (default = 2). Squad consists of units that can be soldiers of vehicles (default = 5, min = 5, max = 10). Vehicles are operated by soldiers (min = 1, max =3).

Squads are the basic, coherent unit that attacks and defends.

```javascript
// @param {string} strategy
// @param {object} priorities
let army1 = Red.spawnArmy('strongest', {health: 1});

// @param {number} number of units
// @param {object} type of unit with attributes
army1.spawnSquad(4, {type: soldier, recharge: 200, experience: 4});
```
Every army has a strategy. If you don't provide a strategy, random one is picked. Possible strategies are 'random', 'weakest', 'strongest'. Every squad of the same army has same strategy.

You can provide an object of priorities of what to look for first, when scanning for next target. Criteria consists of health, numbers, experience and damage. You can provide just one or several of them:

    Blue.spawnArmy('weakest', {health:1, experience:2, damage:3, numbers:4});

Evey squad has certain number of units which have certain attributes. Soldiers have experience and recharge time. Vehicles have recharge time and operators, which have the same attributes as soldiers.

    someArmy.spawnSquad(4, {type: 'soldier', recharge: 400, experience: 20});
	otherArmy.spawnSquad(3, {type: 'vehicle', operators: {experience: 30}});

Every argument is optional, and a random one will be provided so you can just spawn needed number of units and watch them fight.

index.js
```javascript
let {Red, Blue, startSimulation} = require('./lib/simulator');

Red.spawnArmy();
Red.spawnArmy();
Red.spawnArmy();
Red.spawnArmy();

Blue.spawnArmy();
Blue.spawnArmy();
Blue.spawnArmy();
Blue.spawnArmy();

startSimulation();

```
