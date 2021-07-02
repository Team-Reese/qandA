// import statements
const express = require('express');
const cors = require('cors');
// const pool = require('../database/db');
const pool1 = require('../database/localdb');
const models = require('../database/models');


const port = 3000;

// middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('./frontend-capstone/dist')); // get the static files

// ROUTES

// Get all questions AND BUILD RESPOSE OBJ for a particular product
app.get('/qa/questions', (req, res) => {
  // get queryParams from the request
  const queryParams = req.query;
  const productId = req.query.product_id;
  // { product_id: '1234', page: '1', count: '5' }
  // if no querParams default page: 1 count: 5

  models.getQuestions(productId, (err, results) => {
    if (err) {
      res.status(400).send('Error: ', err);
    } else {
      const obj = {};
      obj.product_id = productId;
      obj.results = results.rows;
      let qIds = [];
      results.rows.forEach((row) => { qIds.push(row.question_id); });
      // console.log('our object', obj);
      // console.log('qIds', qIds);
      res.status(200).send(obj);
    }
  });
});

app.get('/qa/test/questions/:question_id/answers', (req, res) => {
  const queryParams = req.query;
  const questionId = req.params.question_id;
  const page = queryParams.page || 1;
  const count = queryParams.count || 5;
  models.getAnswersforQuestions(questionId, page, count, (err, result) => {
    if (err) {
      res.status(500).send('Request failed');
    } else {
      res.status(200).send(result.rows);
    }
  });
});

// Get all answers for a particular question
app.get('/qa/questions/:question_id/answers', (req, res) => {
  const queryParams = req.query;
  const questionId = req.params.question_id;
  const page = queryParams.page || 1;
  const count = queryParams.count || 5;
  models.getAnswers(questionId, page, count, (err, result) => {
    if (err) {
      res.status(500).send('Request failed');
    } else {
      const obj = {};
      obj.question = questionId;
      obj.page = page;
      obj.count = count;
      obj.results = result.rows;
      res.status(200).send(obj);
    }
  });
});

// Post a question to the database
app.post('/qa/questions', (req, res) => {
  const question = req.body;
  const date = Date.now();
  question.date = date;
  models.insertQuestion(question, (err, result) => {
    if (err) {
      res.status(err.status).send('Request failed: ', err);
    } else {
      res.status(201).send('Request successful');
    }
  });
});

// Post an answer to the database
app.post('/qa/questions/:question_id/answers', (req, res) => {
  const questionId = req.params.question_id;
  const answer = req.body;
  const date = Date.now();
  answer.date = date;
  answer.questionId = questionId;
  models.insertAnswer(answer, (err, results) => {
    if (err) {
      res.status(400).send('Request failed: ');
    } else {
      if (answer.photos.length !== 0) {
        const answerId = results.rows[0].answer_id;
        console.log('answerID inside', answerId);
        // call insertPhotos only if post has photos
        models.insertPhotos(answerId, answer.photos, (err1, results2) => {
          if (err) {
            res.status(500).send('Inserting photos failed: ', err1);
          } else {
            res.status(201).send('Answer posted & photos');
          }
        });
      } else {
        res.status(201).send('Answer posted');
      }
    }
  });
});

// Put - Mark a question as helpful
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  const questionId = req.params.question_id;
  models.markQuestionHelpful(questionId, (err, results) => {
    if (err) {
      res.status(400).send('Error marking question as helpful: ', err);
    } else {
      res.status(204).send();
    }
  });
});

// Put - Mark an answer as helpful
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  const answerId = req.params.answer_id;
  models.markAnswerHelpful(answerId, (err, results) => {
    if (err) {
      res.status(400).send('Error marking answer as helpful: ', err);
    } else {
      res.status(204).end();
    }
  });
});

// Put - Report a question
app.put('/qa/questions/:question_id/report', (req, res) => {
  const questionId = req.params.question_id;
  models.reportQuestion(questionId, (err, results) => {
    if (err) {
      res.status(400).send('Error reporting question');
    } else {
      res.status(204).end();
    }
  });
});

// Put - Report an answer
app.put('/qa/answers/:answer_id/report', (req, res) => {
  const answerId = req.params.answer_id;
  models.reportAnswer(answerId, (err) => {
    if (err) {
      res.status(400).send('Error reporting answer');
    } else {
      res.status(204).end();
    }
  });
});

// listen
app.listen(port, () => {
  console.log(`Express server is listening at http://localhost:${port}`);
});

module.exports = app;
