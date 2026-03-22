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
    const CREEP_CONFIG = [
        { role: 'harvester', limit: 2, body: [WORK, WORK, CARRY, MOVE] },
        { role: 'carrier', limit: 2, body: [CARRY, CARRY, MOVE, MOVE] },
        { role: 'upgrader', limit: 2, body: [WORK, CARRY, CARRY, MOVE] },
        { role: 'repairer', limit: 0, body: [WORK, WORK, CARRY, MOVE] },
        { role: 'builder', limit: 0, body: [WORK, WORK, CARRY, MOVE] },
        { role: 'roadworker', limit: 1, body: [WORK, WORK, CARRY, MOVE] },
        { role: 'containercarer', limit: 1, body: [WORK, WORK, CARRY, MOVE] }
    ];

    for (const config of CREEP_CONFIG) {
        const creeps = _.filter(Game.creeps, (c) => c.memory.role === config.role);

        if (creeps.length < config.limit) {
            const name = config.role.charAt(0).toUpperCase() + config.role.slice(1) + Game.time;
            Game.spawns[spawnName].spawnCreep(config.body, name,
                { memory: { role: config.role } });
            break;
        }
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