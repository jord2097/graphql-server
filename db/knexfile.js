// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const development = {
  client: "postgresql",
  connection: {
    host: "localhost", // always localhost
    port: "5433", // either 5432 or 5433 depending on postgres version 9 or latest respectively
    database: "gql-space", // create postgres database with this or any name
    user: "postgres", // postgres is default
    password: "password",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};

export { development };
