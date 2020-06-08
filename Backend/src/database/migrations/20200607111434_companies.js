
exports.up = function(knex) {
  return knex.schema.createTable('companies', function(table){
      table.increments('company_id').primary();
      table.string('company_name').notNullable();
      table.string('company_password').notNullable();
      table.string('company_email').unique().notNullable();
      table.string('company_tel');
      table.string('company_cnpj').unique();
      table.timestamp('create_date_company');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('companies');
};
