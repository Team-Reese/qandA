// const { Pool } = require('pg');
const pool = require('./localdb');

// Models - Database queries
// `SELECT question_id, question_body, question_date, asker_name, question_helpfulness, reported,
//   // (select array(SELECT json_build_object('id', answers.answer_id, 'body', answer_body, 'date', answer_date, 'answerer_name', answerer_name, 'helpfulness', answer_helpfulness, 'photos',
//   // (select array(select json_build_object('id', photo_id, 'url', photo_url) from photos where answer_id = answers.answer_id) as photos)
//   // ) FROM answers) as answers)
//   // from questions where product_id = ${productId};`;
// Get all questions for a particular product
const getQuestions = (productId, callback) => {
  const queryString = 'SELECT * FROM questions WHERE product_id =1;';
  pool.query(queryString, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

// Get all answers for a particular question
const getAnswers = (questionId, callback) => {
  const queryString = `select answer_id, answer_body, answer_date, answerer_name, reported, answer_helpfulness,
    (select array(select json_build_object('id', photo_id, 'url', photo_url) from photos  where answer_id = answers.answer_id) as photos)
    from answers where question_id = ${questionId}; `;
  pool.query(queryString, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};
// Post a question to the database
const insertQuestion = (question, callback) => {
  // format question
  const queryString = `INSERT INTO questions(product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness)
    VALUES(${question.productId}, ${question.body}, ${question.date}, ${question.name}, ${question.email}, 0, 0)`;
  pool.query(queryString, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

// Post an answer to the database
const insertAnswer = (answer, callback) => {
  const queryString = `INSERT INTO answers(question_id, answer_body, answer_date, answerer_name, answerer_email, reported, answer_helpfulness)
    VALUES(${answer.questionId}, '${answer.body}', ${answer.date}, '${answer.name}', '${answer.email}', 0, 0); `;
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
  const queryString = `INSERT INTO photos(answer_id, photo_url)
    VALUES(${answerId}, unnest(ARRAY${photos}))`;
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
  const queryString = `UPDATE questions SET question_helpfulness = question_helpfulness + 1 WHERE question_id = ${questionId}; `;
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
  const queryString = `UPDATE answers SET answer_helpfulness = answer_helpfulness + 1 WHERE answer_id = ${answerId}; `;
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
  const queryString = `UPDATE questions SET reported = 1 WHERE question_id = ${questionId}; `;
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
  const queryString = `UPDATE answers SET reported = 1 WHERE answer_id = ${answerId}; `;
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

  // const queryString = `SELECT
  // // answers.answer_id, answers.answer_body, answers.answer_date, answers.answerer_name, answers.reported, answers.answer_helpfulness,
  // // (SELECT array(SELECT photo_url FROM photos WHERE photos.answer_id = answer.answer_id) as photos)
  // // FROM
  // // answers where question_id =3;`

  // `select answer_id, answer_body, answer_date, answerer_name, reported, answer_helpfulness,

  // select answer_body,
  // (
    //   select array(select json_build_object('id', photo_id, 'url', photo_url));
    //   )))




    // select answer_id, answer_body, answer_date, answerer_name, reported, answer_helpfulness, (select array(select json_build_object('id', photo_id, 'url', photo_url) as photos from photos) as photos from photos where answer_id = answers.answer_id) as photos) from answers where question_id = 1


    //  (select array(select json_build_object('id', photo_id, 'url', photo_url)  where answer_id = answers.answer_id) as photos from photos) from answers where question_id = 3;


    //   select photo_id , photo_url from photos where answer_id =  answers.answer_id) as photos) from answers where question_id = 3;`;

    //  'select json_build_object('id', photo_id, 'url', photo_url) as photos from photos;
    // const queryString = `SELECT * FROM questions WHERE product_id = ${productId};`;
    // const queryString = `SELECT question_id, question_body, question_date, asker_name, question_helpfulness, reported,
    // (SELECT json_build_object(answer_id, answer_id, 'id', answer_id, 'body', answer_body, 'date', answer_date, 'answerer_name', answerer_name, 'helpfulness', answer_helpfulness,
    // 'photos', 'photos' ) from answers where question_id = questions.question_id) as answers from questions where product_id = 1;`










    // SELECT
    // question_id,
    //   question_body,
    //   question_date,
    //   asker_name,
    //   question_helpfulness,
    //   reported,
    //   (select array(
    //     SELECT json_build_object(
    //       'id', answers.answer_id,
    //       'body', answer_body,
    //       'date', answer_date,
    //       'answerer_name', answerer_name,
    //       'helpfulness', answer_helpfulness,
    //       'photos', (select array(select json_build_object(
    //         'id', photo_id,
    //         'url', photo_url)
    //             from photos where answer_id = answers.answer_id) as photos)
    //   ) FROM answers) as answers)
    // from questions where product_id = 1;











    //   // (SELECT json_build_object(answer_id, answer_id, 'id', answer_id, 'body', answer_body, 'date', answer_date, 'answerer_name', answerer_name, 'helpfulness', answer_helpfulness,'photos', 'photos' ) from answers);


    //   SELECT question_id, question_body, question_date, asker_name, question_helpfulness, reported,
    //     (select json_build_object(SELECT answers.answer_id, json_build_object('id', answers.answer_id, 'body', answer_body, 'date', answer_date, 'answerer_name', answerer_name, 'helpfulness', answer_helpfulness, 'photos',
    //       (select array(select json_build_object('id', photo_id, 'url', photo_url) from photos where answer_id = answers.answer_id) as photos)
    //     ) FROM answers) as answers)
    // from questions where product_id = ${ productId };

    // SELECT question_id, question_body, question_date, asker_name, question_helpfulness, reported,
    //   (select json_build_object(answer_id, (select json_build_object(answers.answer_id, 'test') FROM answers) ) from questions) from questions where product_id = 1;


    // select json

    // select json_build_object("name", 1)


    //   (select json_build_object(answers.answer_id, 'test') FROM answers))

    // (select json_build_object(answers.answer_id, 'test') FROM answers)

    // select json_object_agg(
    //   json_build_object(
    //     'test', answers.answer_id,
    //     'testdd', answers.answer_body
    //   )) from answers where questionId = 1;



//  `select answer_id, answer_body, answer_date, answerer_name, reported, answer_helpfulness,
//  (select array(   select json_build_object('id', photo_id, 'url', photo_url) from photos  where answer_id = 1) as photos)
//  from answers where question_id = ${questionId};`;


// const queryString = `select answer_id, answer_body, answer_date, answerer_name, reported, answer_helpfulness,
//  (select array(select photo_url from photos where answer_id =  answers.answer_id) as photos) from answers where question_id = ${questionId};`;