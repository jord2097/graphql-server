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
    static async getById(args) {
        if (args.id) {
            return db
            .first()
            .table('space_centers')
            .where('id', args.id)
        }
        else if (args.uid)  {
            return db
            .first()
            .table('space_centers')
            .where('uid', args.uid)
        }        
    }
    static async getbyUID(uid){
        return db
        .first()
        .table('space_centers')
        .where('uid', uid)
    }   
    static async getAllPaginated(page, pageSize) { 
        return db
        .select()
        .offset(page)
        .limit(pageSize)
        .table('space_centers')
    }
    static async getByCode(code, limit=4) {
        return db
        .select()
        .limit(limit>10?10:limit)   
        .table('space_centers')
        .where('planet_code', code)
        
    }
}

class flights {
    static async getById(id) {
        return db
        .first()
        .table('flights')
        .where('id', id)
    }

    static async getAll() {
        return db
        .select()
        .table('flights')
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
            departure_at: flightInfo.departureAt,
            seat_count: flightInfo.seatCount            
        })
        .returning('*')        
    }
}

class bookings {
    static async getById(id) {
        return db
        .first()
        .table('bookings')
        .where('id', id)
    }

    static async getAll() {
        return db
        .select()
        .table('bookings')
    }
}


export {
    planets,
    spaceCenters,
    flights,
    bookings
}


