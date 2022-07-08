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
    static async getById(id) {
        return db
        .first()
        .table('space_centers')
        .where('id', id)
    }
    static async getAll() { 
        return db
        .select()
        .table('space_centers')
    }
    static async getByCode(code) {
        return db
        .select()        
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


