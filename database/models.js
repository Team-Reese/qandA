// const { Pool } = require('pg');
const pool = require('./localdb');

const getQuestions = (productId, callback) => {
  const temp4 = 'select question_id, question_body, question_date, asker_name, question_helpfulness, reported \
 from questions where product_id =$1 and reported = false \
ORDER BY question_helpfulness DESC LIMIT 10;';

  pool.query(temp4, [productId], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const getAnswersforQuestions = (questionId, page, count, callback) => {
  page = page - 1;
  const skip = count * page;
  const queryString = 'select answer_id, answer_body, answer_date, answerer_name, reported, answer_helpfulness,\
  (select json_object_agg(\'test\', json_build_object(\'id\', photo_id, \'url\', photo_url) from photos  where answer_id = answers.answer_id) as photos)\
  from answers where question_id = $1 AND reported = 0\
   ORDER BY answer_helpfulness DESC LIMIT $2 OFFSET $3;';

  pool.query(queryString, [questionId, count, skip], (err, result) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

// Get all answers for a particular question
const getAnswers = (questionId, page, count, callback) => {
  page = page - 1;
  const skip = count * page;
  const queryString = 'select answer_id, answer_body, answer_date, answerer_name, reported, answer_helpfulness,\
  (select array(select json_build_object(\'id\', photo_id, \'url\', photo_url) from photos  where answer_id = answers.answer_id) as photos)\
  from answers where question_id = $1 AND reported = 0\
   ORDER BY answer_helpfulness DESC LIMIT $2 OFFSET $3;';
  pool.query(queryString, [questionId, count, skip], (err, result) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};
// Post a question to the database
const insertQuestion = (question, callback) => {
  const queryString = 'INSERT INTO questions(product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness) VALUES($1, $2, $3, $4, $5, false, 0)';
  pool.query(queryString, [question.product_id, question.body, question.date,
    question.name, question.email], (err, result) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

// Post an answer to the database
const insertAnswer = (answer, callback) => {
  const queryString = 'INSERT INTO answers(question_id, answer_body, answer_date, answerer_name, answerer_email, reported, answer_helpfulness) VALUES($1, $2, $3, $4, $5, 0, 0) RETURNING answer_id;';
  pool.query(queryString, [answer.questionId, answer.body, answer.date, answer.name, answer.email],
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
};

// Insert photos into photos table in the databse
const insertPhotos = (answerId, photos, callback) => {
  const statement = [];
  photos.forEach((photo) => {
    statement.push(`INSERT INTO photos(answer_id, photo_url) VALUES(${answerId}, '${photo}'); `);
  });
  const newStatement = statement.join('');
  const queryString = newStatement;
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
  const queryString = 'UPDATE questions SET question_helpfulness = question_helpfulness + 1 WHERE question_id =$1;';
  pool.query(queryString, [questionId], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

// Put - Mark an answer as helpful
const markAnswerHelpful = (answerId, callback) => {
  const queryString = 'UPDATE answers SET answer_helpfulness = answer_helpfulness + 1 WHERE answer_id =$1;';
  pool.query(queryString, [answerId], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

// Put - Report a question
const reportQuestion = (questionId, callback) => {
  const queryString = 'UPDATE questions SET reported = true WHERE question_id =$1;';
  pool.query(queryString, [questionId], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

// Put - Report an answer
const reportAnswer = (answerId, callback) => {
  const queryString = 'UPDATE answers SET reported = 1 WHERE answer_id =$1;';
  pool.query(queryString, [answerId], (err, result) => {
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
  getAnswersforQuestions,
  insertQuestion,
  insertAnswer,
  insertPhotos,
  markQuestionHelpful,
  markAnswerHelpful,
  reportQuestion,
  reportAnswer,
};
