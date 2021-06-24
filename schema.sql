CREATE DATABASE sdc_questions_answers;

-- \c questions_and_answers


-- -- CREATE TABLE IF NOT EXISTS products (
-- --   id INT UNIQUE PRIMARY KEY,
-- --   product_name VARCHAR(15),
-- -- );

CREATE TABLE IF NOT EXISTS questions (
  question_id SERIAL UNIQUE NOT NULL PRIMARY KEY,
  product_id INT,
  question_body VARCHAR(1000),
  question_date BIGINT,
  asker_name VARCHAR(60) NOT NULL,
  asker_email VARCHAR(60) NOT NULL,
  reported INT,
  question_helpfulness INT
);

CREATE TABLE IF NOT EXISTS answers (
  answer_id SERIAL UNIQUE NOT NULL PRIMARY KEY,
  question_id SERIAL REFERENCES questions (question_id),
  answer_body VARCHAR(1000),
  answer_date BIGINT,
  answerer_name VARCHAR(60) NOT NULL,
  answerer_email VARCHAR(60)NOT NULL,
  reported INT,
  answer_helpfulness INT
);

CREATE TABLE IF NOT EXISTS photos (
  photo_id SERIAL UNIQUE NOT NULL PRIMARY KEY,
  answer_id SERIAL REFERENCES answers (answer_id),
  photo_url VARCHAR(2048)
);