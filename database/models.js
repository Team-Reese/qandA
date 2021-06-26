// const { Pool } = require('pg');
const pool = require('./db');

// Models - Database queries

// Get all questions for a particular product
const getQuestions = (productId, callback) => {
  const queryString = `SELECT * FROM questions WHERE product_id = ${productId};`;

  pool.query(queryString, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

// Get all answers for a particular question
const getAnswers = (product_id, callback) => {

};

// Post a question to the database
const insertQuestion = (question, callback) => {
  // format question
  const queryString = `INSERT INTO questions (product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness)
  VALUES (${question.productId}, ${question.body}, ${question.date}, ${question.name}, ${question.email}, 0, 0)`;
  pool.query(queryString, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, err);
    }
  });
};

// Post an answer to the database
const insertAnswer = (answer, callback) => {
  const queryString = `INSERT INTO answers (question_id, answer_body, answer_date, answerer_name, answerer_email, reported, answer_helpfulness)
  VALUES (${answer.body}, ${answer.date}, ${answer.name}, ${answer.email}, 0, 0);`;
  pool.query(queryString, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

// Insert photos into photos table in the databse
const insertPhotos = (answerId, photos, callback) => {
  const queryString = `INSERT INTO photos (answer_id, photo_url)
  VALUES (${answerId}, unnest(ARRAY${photos}))`;
  pool.query(queryString, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

// Put - Mark a question as helpful
const markQuestionHelpful = (questionId, callback) => {
  const queryString = `UPDATE questions SET question_helpfulness = question_helpfulness+1 WHERE question_id=${questionId};`;
  pool.query(queryString, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

// Put - Mark an answer as helpful
const markAnswerHelpful = (answerId, callback) => {
  const queryString = `UPDATE answers SET answer_helpfulness = answer_helpfulness+1 WHERE answer_id=${answerId};`;
  pool.query(queryString, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

// Put - Report a question
const reportQuestion = (questionId, callback) => {
  const queryString = `UPDATE questions SET reported = 1 WHERE question_id=${questionId};`;
  pool.query(queryString, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

// Put - Report an answer
const reportAnswer = (answerId, callback) => {
  const queryString = `UPDATE answers SET reported = 1 WHERE answer_id =${answerId};`;
  pool.query(queryString, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

module.exports = {
  // functions here
  getQuestions,
  getAnswers,
  insertQuestion,
  insertAnswer,
  insertPhotos,
  markQuestionHelpful,
  markAnswerHelpful,
  reportQuestion,
  reportAnswer,
};
