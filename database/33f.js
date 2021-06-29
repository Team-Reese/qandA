const { Pool } = require('pg');
const PSQL_PASSWORD = require('./config');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: 'jackdog',
  port: 5432,
});

// Connection error handling
pool.connect((err) => {
  if (err) {
    console.log('Connection error', err);
  } else {
    console.log('Connected');
  }
});

module.exports = pool;
