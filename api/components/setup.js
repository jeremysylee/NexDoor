const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: 'nexdoor',
  password: process.env.DB_PASS,
  port: 5432,
});

// pool.connect((err) => {
//   if (err) {
//     console.log('err connecting to psql', err.stack);
//   }
// });

module.exports = pool;
