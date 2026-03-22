export const roleBuilder = {
    run: function(creep: Creep) {

        if (creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.building = false;
        }
        if (!creep.memory.building && creep.store.getFreeCapacity() === 0) {
            creep.memory.building = true;
        }

        if (creep.memory.building) {
            const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length > 0) {
                if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
            creep.say('🏗️ Build');
            return;
        }

        const targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) =>
                (structure.structureType === STRUCTURE_EXTENSION ||
                    structure.structureType === STRUCTURE_SPAWN) &&
                structure.store[RESOURCE_ENERGY] > 0
        });

        if (targets.length > 0) {
            if (creep.withdraw(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
            creep.say('🔄 Collect');
            return;
        }

        const drops = creep.room.find(FIND_DROPPED_RESOURCES);
        if (drops.length > 0) {
            if (creep.pickup(drops[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(drops[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
};