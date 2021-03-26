'use strict';
const env = require('./env/db_env.json');
//common_modules/env/db_env.json 필요
/*e.g {
  "db_env": {
    "SERVER_PORT": 3000,
    "DB_HOST": "localhost",
    "DB_USER": "root",
    "DB_PASSWORD": "password"
  }
}*/
function dbConn() {
  return env.db_env.DB_HOST; //형식 접근
}

module.exports = dbConn;
