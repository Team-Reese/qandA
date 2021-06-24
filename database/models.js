// const { Pool } = require('pg');
const pool = require('./db');

// Models - Database queries

// Get all questions for a particular product
const getQuestions = (product_id, callback) => {

};

// Get all answers for a particular question
const getAnswers = (product_id, callback) => {

};

// Post a question to the database
const insertQuestion = (question, callback) => {

};

// Post an answer to the database
const insertAnswer = (answer, callback) => {

};

// Put - Mark a question as helpful
const markQuestionHelpful = (callback) => {

};

// Put - Mark an answer as helpful
const markAnswerHelpful = (callback) => {

};

// Put - Report a question
const reportQuestion = (callback) => {

};

// Put - Report an answer
const reportAnswer = (callback) => {

};

module.exports = {
// functions here
  getQuestions,
  getAnswers,
  insertQuestion,
  insertAnswer,
  markQuestionHelpful,
  markAnswerHelpful,
  reportQuestion,
  reportAnswer,
};
