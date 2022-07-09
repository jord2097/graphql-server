import {planets,
    spaceCenters,
    flights,
    bookings} from '../db/queryBuilders.js'

import pkg from 'graphql-iso-date'
const {GraphQLDate, GraphQLDateTime} = pkg
import crypto from 'crypto'

const resolvers = {
    // Queries
    Query: {
        planets: () => planets.getAll(),        
        spaceCenter: (parent, args) => spaceCenters.getById(args),
        spaceCenters: (_, args) => args
    },
    // Types
    Planet: {        
        spaceCenters: (parent, args) => spaceCenters.getByCode(parent.code, args.limit) // fetches space centers of a planet limited to int in args.limit        
    },   
    SpaceCenter: {
        planet: parent => planets.getByCode(parent.planet_code) // assigns each space-center its planet
    },
    SpaceCenters: {   
        
        nodes: (parent, args) => { 
               // use default args if none specified            
               let page = parent.page ? parent.page : 1               
               let pageSize = parent.pageSize ? parent.pageSize : 10
               let pageIndex = page * pageSize
               // e.g. pageIndex of 2 shows results 10-20
            return spaceCenters.getAllPaginated(pageIndex, pageSize)},
    },
    Flight: {
        launching_site: (flight, args, context, info) => spaceCenters.getbyUID(info.variableValues.flightInfo.launchSiteId)
        // landing site
    },    
    // Mutations
    Mutation: {
        scheduleFlight: async (_, { flightInfo }) => {            
            const uniqueCode = crypto.randomBytes(16).toString("hex")
            const newFlight = async () => {
                const response = await flights.schedule(flightInfo, uniqueCode)
                return response
            }
            const result = await newFlight()
            return result[0]  
            
        }        
    },
    // Scalars
    Date: GraphQLDateTime, 

    
   
}

export default resolvers;

