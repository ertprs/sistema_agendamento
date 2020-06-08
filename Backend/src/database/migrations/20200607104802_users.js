
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table){
      table.increments('user_id').primary();
      table.string('user_name').notNullable();
      table.string('user_password').notNullable();
      table.string('user_email').unique().notNullable();
      table.string('user_tel');
      table.timestamp('create_data');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
