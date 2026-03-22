export const roleHarvester = {
    run: function (creep) {
        if (creep.store.getFreeCapacity() > 0) {
            creep.say("Harvest");

            const sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: "#ffaa00" } });
            }

            return;
        }

        // Prio 1: Fill spawn/extensions with energy
        const targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) =>
                (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        });

        if (targets.length > 0) {
            creep.say("Deliver");

            if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#FFFFFF" } });
            }

            return;
        }

        // Prio 2: Help builder with construction sites
        const sites = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (sites.length > 0) {
            creep.say("Build");

            if (creep.build(sites[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sites[0], { visualizePathStyle: { stroke: "#FFFFFF" } });
            }
        }

        creep.say("Idle");
    }
};
