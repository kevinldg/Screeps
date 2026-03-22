// @ts-nocheck

import {roleHarvester} from "./role.harvester";
import {roleUpgrader} from "./role.upgrader";
import {roleBuilder} from "./role.builder";
import {roleCarrier} from "./role.carrier";
import {roleRepairer} from "./role.repairer";

export function loop() {

    // Consts
    const spawnName = "Spawn";

    // Clear memory
    for (const name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log("Clearing non-existing creep memory:", name);
        }
    }

    // Spawn creeps
    const harvesters = _.filter(Game.creeps, (c) => c.memory.role == 'harvester');
    const carriers = _.filter(Game.creeps, (c) => c.memory.role == 'carrier');
    const upgraders = _.filter(Game.creeps, (c) => c.memory.role == 'upgrader');
    const builders = _.filter(Game.creeps, (c) => c.memory.role == 'builder');
    const repairers = _.filter(Game.creeps, (c) => c.memory.role == 'repairer');

    if (harvesters.length < 2) {
        const name = 'Harvester' + Game.time;
        Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE], name, { memory: { role: 'harvester' } });
    } else if (carriers.length < 2) {
        const name = 'Carrier' + Game.time;
        Game.spawns[spawnName].spawnCreep([CARRY, CARRY, MOVE], name, { memory: { role: 'carrier' } });
    } else if (upgraders.length < 1) {
        const name = 'Upgrader' + Game.time;
        Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE], name, { memory: { role: 'upgrader' } });
    } else if (repairers.length < 1) {
        const name = 'Repairer' + Game.time;
        Game.spawns[spawnName].spawnCreep([WORK, WORK, CARRY, MOVE], name, { memory: { role: 'repairer' } });
    } else if (builders.length < 1) {
        const name = 'Builder' + Game.time;
        Game.spawns[spawnName].spawnCreep([WORK, WORK, CARRY, MOVE], name, { memory: { role: 'builder' } });
    }

    // Execute roles
    const roles = {
        harvester: roleHarvester,
        upgrader: roleUpgrader,
        builder: roleBuilder,
        carrier: roleCarrier,
        repairer: roleRepairer
    };

    for(const name in Game.creeps) {
        const creep = Game.creeps[name];
        roles[creep.memory.role].run(creep);
    }

}