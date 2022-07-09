import {planets,
    spaceCenters,
    flights,
    bookings} from '../db/queryBuilders.js'

const resolvers = {
    Query: {
        planets: () => planets.getAll(),        
        spaceCenter: (parent, args) => spaceCenters.getById(args),
        spaceCenters: () => []
    },
    Planet: {        
        spaceCenters: (parent, args) => spaceCenters.getByCode(parent.code, args.limit) // fetches space centers of a planet limited to int in args.limit        
    },   
    SpaceCenter: {
        planet: parent => planets.getByCode(parent.planet_code) // assigns each space-center its planet
    },
    SpaceCenters: {        
        nodes: (_, {page, pageSize}) => spaceCenters.getAllPaginated(page, pageSize),
    }, 
    
   
}

export default resolvers;

