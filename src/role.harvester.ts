export const roleHarvester = {
    run: function (creep: Creep) {

        const sources = creep.room.find(FIND_SOURCES);

        if (creep.store.getFreeCapacity() > 0) {
            creep.say("⛏️");

            if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: "#ffaa00" } });
            }

            return;
        }

        creep.say("⬇️");
        creep.drop(RESOURCE_ENERGY);
    }
};