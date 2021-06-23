// MongoDB data modeling

// Q&A Collection

{
  product_id: ,
    questions: {
    question_id: {
      question_id:
      question_body:
      question_date:
      asker_name:
      question_helpfulness:
      reported:
      answers: {
        id: {
          id:
          body:
          date:
          answerer_name:
          helpfulness:
          photos: [{
            id:
            url:
          },
           {},
        ]
          reported:
          },
        id: {
          // the rest of the answers go here....

        },
      }
    },
    {
      question_id:
      question_body:
      question_date:
      asker_name:
      question_helpfulness:
      reported:
      answers: {
        id: {
          id:
          body:
          date:
          answerer_name:
          helpfulness:
          photos:
          reported:
            },
        id: {
          // more answers....

        },
      }
    },
    // ... the rest of the questions go here
  }
}