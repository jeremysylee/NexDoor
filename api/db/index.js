const { Pool } = require('pg');
require('dotenv').config();

// let pool;

// if (process.env.NODE_ENV !== 'test') {
//   pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_DB,
//     password: process.env.DB_PASS,
//     port: 5432,
//     allowExitOnIdle: true,
//   });
// } else {
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'nexdoorsdc',
  password: 'b00l3an!',
  port: 5432,
  allowExitOnIdle: true,
});
// }

module.exports = pool;
