  SELECT
  question_id,
    question_body,
    question_date,
    asker_name,
    question_helpfulness,
    reported,
    (select array(
      SELECT json_build_object(
        // 'id', answers.answer_id,
        // 'bodyselec', answer_body,
        // 'date', answer_date,
        // 'answerer_name', answerer_name,
        // 'helpfulness', answer_helpfulness,
        // 'photos', (select array(select json_build_object(
        //   'id', photo_id,
        //   'url', photo_url)
        //       from photos where answer_id = answers.answer_id) as photos)
    ) FROM answers) as answers)
  from questions where product_id = 1;



  // WORKS
  select array(select json_build_object('id', photo_id, 'url', photo_url) from photos where answer_id = 3) as photos;
 photos

 (select array(select json_build_object('id', photo_id, 'url', photo_url) from photos where answer_id = 3) as photos)

 select json_build_object(answers.answer_id, answers.answer_id, 'body', answers.answer_body, 'date', answer_date, 'answerer_name', answerer_name, 'helpfulness', answer_helpfulness, 'photos', (select array(select json_build_object('id', photo_id, 'url', photo_url) from photos where answer_id = 1) as photos)) FROM answers


select question_id, question_body, question_date, asker_name, question_helpfulness, reported from questions where product_id =1;


select json_build_object('id', answers.answer_id, 'body', answers.answer_body, 'date', answer_date, 'answerer_name', answerer_name, 'helpfulness', answer_helpfulness, 'photos', (select array(select json_build_object('id', photo_id, 'url', photo_url) from photos where answer_id = 1) as photos)) FROM answers
(select json_build_object('id', answers.answer_id, 'body', answers.answer_body, 'date', answer_date, 'answerer_name', answerer_name, 'helpfulness', answer_helpfulness, 'photos', (select array(select json_build_object('id', photo_id, 'url', photo_url) from photos where answer_id = 1) as photos)) FROM answers)

select json_object_agg(answers.answer_id, json_build_object('id', answer_id) from answers) from answers;

select json_object_agg(answers.answer_id, json_build_object('id', answer_id)) from answers;

// this doesn't works
select json_object_agg(answers.answer_id,

  (json_build_object('id', answers.answer_id, 'body', answers.answer_body, 'date', answer_date, 'answerer_name', answerer_name, 'helpfulness', answer_helpfulness, 'photos', (select array(select json_build_object('id', photo_id, 'url', photo_url) from photos where answer_id = 1) as photos)))


  ) from answers;

// this works
  select json_object_agg(answer_id,
    json_build_object('id', answers.answer_id, 'body', answers.answer_body, 'date', answer_date, 'answerer_name', answerer_name, 'helpfulness', answer_helpfulness, 'photos', (select array(select json_build_object('id', photo_id, 'url', photo_url) from photos where answer_id = 1) as photos))
  ) from answers as results;


