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
        table.string('name', 500).notNullable()
        table.string('uid', 500).notNullable().unique()        
        table.string('description', 500)
        table.float('latitude', 500).notNullable()
        table.float('longitude', 500).notNullable()
        table.string('planet_code', 500).notNullable()
        table.timestamps(true, true)  
    })
    .createTable('flights', table => {
        table.increments('id');
        table.string('code').notNullable().unique()        
        table.datetime('departure_at').notNullable()        
        table.integer('seat_count').notNullable()
        table.string('launching_site_id').notNullable()
        table.string('landing_site_id').notNullable()
        table.timestamps(true, true)  

    })
    .createTable('bookings', table => {
        table.increments('id');
        table.string('flight').notNullable()
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
