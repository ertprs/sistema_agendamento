
exports.up = function(knex) {
  return knex.schema.createTable('attendance', function(table){
      table.increments('attendace_id').primary();
      table.date('attendace_date').notNullable();
      table.string('opening_hours').notNullable();

      table.integer('company_id').notNullable();

      table.foreign('company_id').references('company_id').inTable('companies');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('services');
};
