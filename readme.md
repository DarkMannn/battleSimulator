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

    Red.spawnArmy('strongest');
    Blue.spawnArmy('weakest', {health:1, experience:2, damage:3, numbers:4});

If the strategy is 'weakest' and number one priority is health for instance. Enemy squad with the least ammount of health is picked as a next Target.
If the strategy 'strongest' target with most ammount of health would've been chosen.
If there are two targets with the same level of first priority attribute, the second attribute is considered.
If you set just the strategy, wheter is 'strongest' or 'weakest' a computer would choose best target according to already set criteria.

Evey squad has certain number of units which have certain attributes. Soldiers have experience and recharge time. Vehicles have recharge time and operators, which have the same attributes as soldiers.

    someArmy.spawnSquad(4, {type: 'soldier', recharge: 400, experience: 20});
    otherArmy.spawnSquad(3, {type: 'vehicle', operators: {experience: 30, recharge: 1200}});

Every argument is optional, and a random one will be provided so you can just spawn needed number of units and watch them fight.

index.js
```javascript
let {Red, Blue, startSimulation} = require('./lib/simulator');

// spawn four armies with 2 squads each
Red.spawnArmy();
Red.spawnArmy();
Red.spawnArmy();
Red.spawnArmy();

// spawn four armies with 2 squads each
Blue.spawnArmy();
Blue.spawnArmy();
Blue.spawnArmy();
Blue.spawnArmy();

startSimulation();

```
