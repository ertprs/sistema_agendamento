
exports.up = function(knex) {
  return knex.schema.createTable('schedule', function(table){
      table.increments('schedule_id').primary();
      table.boolean('status').notNullable();

      table.integer('company_id_schedule').notNullable();
      table.foreign('company_id').references('company_id').inTable('companies');

      table.integer('user_id').notNullable();
      table.foreign('user_id').references('user_id').inTable('users');

      table.integer('service_id').notNullable();
      table.foreign('service_id').references('service_id').inTable('services');

      table.integer('attendace_id').notNullable();
      table.foreign('attendace_id').references('attendace_id').inTable('attendance');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('schedule');
};
