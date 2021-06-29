const { Pool } = require('pg');

const pool1 = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  port: 5433,
});

// Connection error handling
pool1.connect((err) => {
  if (err) {
    console.log('Connection error', err);
  } else {
    console.log('Connected to local database');
  }
});

module.exports = pool1;
