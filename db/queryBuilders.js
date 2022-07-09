import db from './database.js'

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
    static async getAllPaginated(page, pageSize) { 
        return db
        .select()
        .offset(page ? page : 0)
        .limit(pageSize ? pageSize : 5)
        .table('space_centers')
    }
    static async getByCode(code, limit) {
        return db
        .select()
        .limit(limit)   
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
    
    static async schedule(flightInfo) {
        return db('flights')
        .insert({
            code: flightInfo.code,
            departure_at: flightInfo.departure_at,
            seat_count: flightInfo.seat_count            
        })
        
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


