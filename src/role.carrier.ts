export const roleCarrier = {
    run: function (creep: Creep) {

        if (creep.store.getUsedCapacity() === 0) {
            creep.memory.collecting = true;
        }

        if (creep.store.getFreeCapacity() === 0) {
            creep.memory.collecting = false;
        }

        if (creep.memory.collecting) {
            creep.say("📦");

            const drops = creep.room.find(FIND_DROPPED_RESOURCES);

            if (drops.length > 0) {
                if (creep.pickup(drops[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(drops[0], { visualizePathStyle: { stroke: "#ffaa00" } });
                }
            }

            return;
        }

        creep.say("🚚");

        const targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure: AnyStructure) =>
                (structure.structureType === STRUCTURE_SPAWN ||
                    structure.structureType === STRUCTURE_EXTENSION) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        });

        if (targets.length > 0) {
            if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
            }
        }
    }
};