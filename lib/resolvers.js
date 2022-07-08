import db from '../db/database.js'

const resolvers = { 
    SpaceCenter: {
        planet: (parent) => {
            console.log(parent)
        }
    },
   
}
// 

export default resolvers;

