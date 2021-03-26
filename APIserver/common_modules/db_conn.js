'use strict';
const env = require('./env/db_env.json');

function db_conn() {
  return env.db_env.DB_HOST; //형식 접근
}

module.exports = db_conn;
