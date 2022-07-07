import pkg from 'knex'
const { knex } = pkg
import {development} from './knexfile.js'

const db = knex(development)
export default db



/* import pkg from 'pg'
const {Client} = pkg

const client = new Client ({
    host: "localhost",
    user: "postgres",
    port: "5433",
    password: "password",
    database: "postgres"

})

client.connect()

client.query('SELECT NOW()', (err, res) => {
  console.log(err,res)
  client.end()
})
 */


