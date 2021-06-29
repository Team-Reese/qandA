  SELECT
  question_id,
    question_body,
    question_date,
    asker_name,
    question_helpfulness,
    reported,
    (select array(
      SELECT json_build_object(
        'id', answers.answer_id,
        'body', answer_body,
        'date', answer_date,
        'answerer_name', answerer_name,
        'helpfulness', answer_helpfulness,
        'photos', (select array(select json_build_object(
          'id', photo_id,
          'url', photo_url)
              from photos where answer_id = answers.answer_id) as photos)
    ) FROM answers) as answers)
  from questions where product_id = 1;





