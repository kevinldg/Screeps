import {roleHarvester} from "./role.harvester";
import {roleUpgrader} from "./role.upgrader";

export function loop() {

    // Clear memory
    for (const name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log("Clearing non-existing creep memory:", name);
        }
    }

    // Always one harvester and one upgrader

    // @ts-ignore
    const harvesters = _.filter(Game.creeps, (c) => c.memory.role == 'harvester');
    if (harvesters.length < 1) {
        const name = 'Harvester' + Game.time;
        Game.spawns['Spawn'].spawnCreep([WORK, CARRY, MOVE], name, { memory: { role: 'harvester' } });
    }

    // @ts-ignore
    const upgraders = _.filter(Game.creeps, (c) => c.memory.role == 'upgrader');
    if (upgraders.length < 1) {
        const name = 'Upgrader' + Game.time;
        Game.spawns['Spawn'].spawnCreep([WORK, CARRY, MOVE], name, { memory: { role: 'upgrader' } });
    }

    // Execute roles
    for(const name in Game.creeps) {
        const creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }

}