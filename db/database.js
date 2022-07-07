import pkg from 'knex'
const { knex } = pkg
import knexfile from './knexfile.js'

const db = knex(knexfile.development)
module.exports = db



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

