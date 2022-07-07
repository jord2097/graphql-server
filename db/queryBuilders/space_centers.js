import db from '../database'

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

export default spaceCenters
