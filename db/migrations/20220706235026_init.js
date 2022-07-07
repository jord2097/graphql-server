/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .createTable('planets', table => {
        table.increments('id');
        table.string('name').notNullable();
        table.string('code').notNullable();
        table.timestamps(true, true)    
    })
    .createTable('space_centers', table => {
        table.increments('id');
        table.string('uid').notNullable().unique()
        table.string('name').notNullable()
        table.string('description')
        table.float('latitude').notNullable()
        table.float('longitude').notNullable()
        table.timestamps(true, true)  
    })
    .createTable('flights', table => {
        table.increments('id');
        table.string('code').notNullable().unique()
        table.datetime('departure_at').notNullable()
        table.integer('seat_count').notNullable()
        table.timestamps(true, true)  

    })
    .createTable('bookings', table => {
        table.increments('id');
        table.integer('seat_count').notNullable()
        table.string('email').notNullable()
        table.timestamps(true, true)  
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema
        .dropTable('planets')
        .dropTable('space_centers')
        .dropTable('flights')
        .dropTable('bookings')
}
