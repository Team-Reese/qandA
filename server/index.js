// import statements
const express = require('express');
const cors = require('cors');
const pool = require('../database/db');
// const pool1 = require('../database/localdb');

const port = 3000;

// middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('client')); // get the static files

// ROUTES

// Get all questions for a particular product
app.get('/qa/questions', (req, res) => {
  const test = { name: 'name' };
  console.log('req.body', req.body);

  res.status(200).send(test);


});

// Get all answers for a particular question
app.get('/qa/questions/:question_id/answers', (req, res) => {

});

// Post a question to the database
app.post('/qa/questions', (req, res) => {

});

// Post an answer to the database
app.post('/qa/questions/:question_id/answers', (req, res) => {

});

// Put - Mark a question as helpful
app.put('/qa/questions/:question_id/helpful', (req, res) => {

});

// Put - Mark an answer as helpful
app.put('/qa/answers/:answer_id/helpful', (req, res) => {

});

// Put - Report a question
app.put('/qa/questions/:question_id/report', (req, res) => {

});

// Put - Report an answer
app.put('qa/answers/:answer_id/report', (req, res) => {

});

// listen
app.listen(port, () => {
  console.log(`Express server is listening at http://localhost:${port}`);
});

module.exports = app;
