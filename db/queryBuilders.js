import db from './database.js'
import crypto from 'crypto'

// functions to be used in resolvers to get specified data from db

class planets {    
    static async getAll() {
        return db
        .select()
        .table('planets')
    }
    static async getByCode(code) {
        return db
        .first()
        .table('planets')
        .where('code', code)
    }
}

class spaceCenters {    
    static async getBy(args) { // parameter is an obj in which we expect an id/uid
        return db('space_centers')
        .first()
        .modify(function(queryBuilder) {
            if (args.id) {
                queryBuilder.where('id', args.id)
            }
            if (args.uid) {
                queryBuilder.where('uid', args.uid)
            }
        })
    }
    static async getbyUID(uid){
        return db('space_centers')
        .first()        
        .where('uid', uid)
    }      
    static async getAllPaginated(page, pageSize) {
        pageSize > 100 ? pageSize = 100 : pageSize        
        return db
        .select()
        .offset(page)
        .limit(pageSize)
        .orderBy('id', 'asc') // default sorting is problematic
        .table('space_centers')
    }
    static async getByCode(code, limit) {
        return db
        .select()
        .limit(limit>10?10:limit)   
        .table('space_centers')
        .where('planet_code', code)        
    }
    static async getCount(){
        return db('space_centers')
        .count("id")
        .first()        
    }
}

class flights {
    static async getById(id) {
        return db
        .first()
        .table('flights')
        .where('id', id)
    }    
    static async getAllPaginated(filters, page, pageSize) {
        pageSize > 100 ? pageSize = 100 : pageSize
        return db
        .select()               
        .offset(page)
        .modify(function (queryBuilder) {
            if (filters.from) { // these conditionals may need to be typed
                queryBuilder.where('launching_site_id', filters.from)                
            }
            if (filters.to) {
                queryBuilder.where('landing_site_id', filters.to)
            }
            if (filters.departureDate) {
                queryBuilder.where('departure_at', filters.departureDate)
            }
            if (filters.seatCount) {
                queryBuilder.where('seat_count', filters.seatCount)
            }
        })
        .limit(pageSize)
        .orderBy('id', 'asc')
        .table('flights')
    }
    static async getCount(){
        return db('flights')
        .count("id")
        .first()        
    }    
    static async getByCode(code) {
        return db
        .first()
        .table('flights')
        .where('code', code)
    }
    static async schedule(flightInfo, code) {           
        return db('flights')
        .insert({
            code: code,
            launching_site_id: flightInfo.launchSiteId,
            landing_site_id: flightInfo.landingSiteId,
            departure_at: flightInfo.departureAt,
            seat_count: flightInfo.seatCount,
            available_seats: flightInfo.seatCount            
        })
        .returning('*')        
    }
    static async bookSeats(bookInfo) {
        let seatsBooked = -bookInfo.seatCount
        return db('flights')
        .where('code', bookInfo.flightId)
        .increment('available_seats', seatsBooked)
    }
}

class bookings {
    static async getById(id) {
        return db
        .first()
        .table('bookings')
        .where('id', id)
    }

    static async getAllPaginated(filters, page, pageSize) {
        pageSize > 100 ? pageSize = 100 : pageSize        
        return db('bookings')
        .select()
        .offset(page)
        .limit(pageSize)
        .modify(function (queryBuilder) {
            if (filters.email) {
                queryBuilder.where('email', filters.email)
            }
        })
        .orderBy('id', 'asc') // default sorting is problematic
        
    }
    static async getCount(){
        return db('bookings')
        .count("id")
        .first()        
    }   

    static async book(bookInfo) {
        return db('bookings')
        .insert({
            flight: bookInfo.flightId,
            seat_count: bookInfo.seatCount,
            email: bookInfo.email
        })
        .returning('*')
    }
}


export {
    planets,
    spaceCenters,
    flights,
    bookings
}


