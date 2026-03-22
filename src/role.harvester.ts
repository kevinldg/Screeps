export const roleHarvester = {
    run: function (creep: Creep) {

        const source = creep.room.find(FIND_SOURCES)[0];
        const containers = source.pos.findInRange(FIND_STRUCTURES, 10, {
            filter: (s) => s.structureType === STRUCTURE_CONTAINER && s.store.getFreeCapacity() > 0
        }) as StructureContainer[];

        const container = containers[0];

        if (creep.store.getFreeCapacity() > 0) {
            if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source, { visualizePathStyle: { stroke: "#FFD700" } });
            }
        } else {
            if (container) {
                if (creep.transfer(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, { visualizePathStyle: { stroke: "#FFD700" } });
                }
            }
        }
    }
};