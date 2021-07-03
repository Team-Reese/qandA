require('dotenv').config();
const { Pool } = require('pg');

const pool1 = new Pool({
  user: 'postgres',
  host: 'ec2-3-137-167-69.us-east-2.compute.amazonaws.com',
  database: 'postgres',
  password: process.env.SECRET_PASSWORD,
  port: 5432,
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




// const pool1 = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'qa_sdc',
//   port: 5433,
// });
