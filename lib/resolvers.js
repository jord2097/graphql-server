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
        spaceCenters: (_, args) => args,
        flights: (_, args) => args,
    },
    // Types
    Planet: {        
        spaceCenters: (parent, args) => spaceCenters.getByCode(parent.code, args.limit) // fetches space centers of a planet limited to int in args.limit        
    },   
    SpaceCenter: {
        planet: parent => planets.getByCode(parent.planet_code) // assigns each space-center its planet
    },
    SpaceCenters: {        
        pagination: async (parent) => {
            // use default page args if none specified
            let page = parent.page ? parent.page : 1               
            let pageSize = parent.pageSize ? parent.pageSize : 10
            let total = await spaceCenters.getCount()            
            return {
                total: total.count,
                page: page,
                pageSize: pageSize
            }
        },               
        nodes: (parent) => {                       
               let page = parent.page ? parent.page : 1               
               let pageSize = parent.pageSize ? parent.pageSize : 10
               let pageIndex = (page * pageSize) - pageSize // e.g. pageIndex of 2 shows results 10-20               
            return spaceCenters.getAllPaginated(pageIndex, pageSize)},
    },
    Flight: {
        launching_site: (flight, args, context, info) => spaceCenters.getbyUID(info.variableValues.flightInfo.launchSiteId),        
        landing_site: (flight, args, context, info) => spaceCenters.getbyUID(info.variableValues.flightInfo.landingSiteId)
    },
    Flights: {
        pagination: async (parent) => {
            let page = parent.page ? parent.page : 1               
            let pageSize = parent.pageSize ? parent.pageSize : 10
            let total = await flights.getCount()
            return {
                total: total.count,
                page: page,
                pageSize: pageSize
            }  
        },
        nodes: (parent) => {
            let page = parent.page ? parent.page : 1               
            let pageSize = parent.pageSize ? parent.pageSize : 10
            let pageIndex = (page * pageSize) - pageSize // e.g. pageIndex of 2 shows results 10-20               
            return flights.getAllPaginated(pageIndex, pageSize)},    
    },    
    // Mutations
    Mutation: {
        scheduleFlight: async (_, { flightInfo }) => {            
            const uniqueCode = crypto.randomBytes(16).toString("hex")            
            const result = await flights.schedule(flightInfo, uniqueCode)
            console.log(result[0])            
            return result[0]           
        }        
    },
    // Scalars
    Date: GraphQLDateTime, 

    
   
}

export default resolvers;

