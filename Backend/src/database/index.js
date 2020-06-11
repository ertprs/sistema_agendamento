const environment = process.env.NODE_ENV || 'development';
const knexfile = require('../../knexfile')[environment];
const knex = require('knex')(knexfile);

module.exports = knex; 