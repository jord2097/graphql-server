import {planets,
    spaceCenters,
    flights,
    bookings} from '../db/queryBuilders.js'

const resolvers = {
    Query: {
        planets: () => planets.getAll(),        
        spaceCenter: (parent, {id}) => spaceCenters.getById(id),
        spaceCenters: () => spaceCenters.getAll(), // paginated list of the many space-centers
    },
    Planet: {
        spaceCenters: parent => spaceCenters.getByCode(parent.code) // establishes one-to-many relationship of spacecenters to their planet
    },   
    SpaceCenter: {
        planet: parent => planets.getByCode(parent.planet_code) // assigns each space-center its planet
    },
    
   
}
// 

export default resolvers;

