'use strict';
const env = require('./env/env.json');
//common_modules/env/env.json 필요
/*e.g{
  "db_env": {
    "SERVER_PORT": 3000,
    "DB_HOST": "localhost",
    "DB_USER": "root",
    "DB_PASSWORD": "password"
  }
}*/

const db = require('knex')({
  client: 'mysql',
  connection: {
    host: env.db_env.DB_HOST,
    user: env.db_env.DB_USER,
    password: env.db_env.DB_PASSWORD,
    database: env.db_env.DB_DATABASE,
  },
});

module.exports = db;
