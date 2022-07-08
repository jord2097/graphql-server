import db from './database'

class planets {    
    static async getAll() {
        return db
        .select()
        .table('planets')
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
