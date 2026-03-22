// @ts-nocheck

import {roleHarvester} from "./role.harvester";
import {roleUpgrader} from "./role.upgrader";
import {roleBuilder} from "./role.builder";
import {roleCarrier} from "./role.carrier";
import {roleRepairer} from "./role.repairer";
import {roleRoadworker} from "./role.roadworker";
import {roleContainerCarer} from "./role.containerCarer";

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
    const roadworkers = _.filter(Game.creeps, (c) => c.memory.role == 'roadworker');
    const containercarer = _.filter(Game.creeps, (c) => c.memory.role == 'containercarer');

    if (harvesters.length < 2) {
        const name = 'Harvester' + Game.time;
        Game.spawns[spawnName].spawnCreep([WORK, WORK, CARRY, MOVE], name, { memory: { role: 'harvester' } });
    } else if (carriers.length < 2) {
        const name = 'Carrier' + Game.time;
        Game.spawns[spawnName].spawnCreep([CARRY, CARRY, MOVE, MOVE], name, { memory: { role: 'carrier' } });
    } else if (upgraders.length < 1) {
        const name = 'Upgrader' + Game.time;
        Game.spawns[spawnName].spawnCreep([WORK, CARRY, CARRY, MOVE], name, { memory: { role: 'upgrader' } });
    } else if (repairers.length < 0) {
        const name = 'Repairer' + Game.time;
        Game.spawns[spawnName].spawnCreep([WORK, WORK, CARRY, MOVE], name, { memory: { role: 'repairer' } });
    } else if (builders.length < 1) {
        const name = 'Builder' + Game.time;
        Game.spawns[spawnName].spawnCreep([WORK, WORK, CARRY, MOVE], name, { memory: { role: 'builder' } });
    } else if (roadworkers.length < 1) {
        const name = 'Roadworker' + Game.time;
        Game.spawns[spawnName].spawnCreep([WORK, WORK, CARRY, MOVE], name, { memory: { role: 'roadworker' } });
    } else if (containercarer.length < 1) {
        const name = 'Containercarer' + Game.time;
        Game.spawns[spawnName].spawnCreep([WORK, WORK, CARRY, MOVE], name, { memory: { role: 'containercarer' } });
    }

    // Execute roles
    const roles = {
        harvester: roleHarvester,
        upgrader: roleUpgrader,
        builder: roleBuilder,
        carrier: roleCarrier,
        repairer: roleRepairer,
        roadworker: roleRoadworker,
        containercarer: roleContainerCarer
    };

    for(const name in Game.creeps) {
        const creep = Game.creeps[name];
        roles[creep.memory.role].run(creep);
    }

}