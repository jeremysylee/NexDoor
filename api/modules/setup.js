const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: 'nexdoor-test',
  password: process.env.DB_PASS,
  port: 5434,
});

pool.connect((err) => {
  if (err) {
    console.log('err connecting to psql', err.stack);
  } else {
    console.log('connected to psql testing db');
  }
});

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
};
