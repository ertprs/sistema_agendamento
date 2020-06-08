
exports.up = function(knex) {
  return knex.schema.createTable('services', function(table){
    table.increments('service_id').primary();
    table.string('service_name').notNullable();
    table.decimal('value').notNullable();
    
    table.integer('company_id').notNullable();

    table.foreign('company_id').references('company_id').inTable('companies');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('services');
};
