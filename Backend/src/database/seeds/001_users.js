
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          user_id: 1,
          user_name:'Rendrikson',
          user_password:'123456', 
          user_email:'rendrikson@email.com', 
          user_tel:'99993333'
        }
      ]);
    });
};
