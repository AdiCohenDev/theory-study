import client from '../../../db';
import { IUserAnswer } from '@theory-study/types';

export const saveUserAnswersInDB = async (userProgress: IUserAnswer) => {
  const values = Object.values(userProgress);
  const params = Object.keys(userProgress).map((_, index) => `$${index + 1}`);
  console.log({ values: values, nums: params });

  const res = await client.query(
    `INSERT INTO user_answers (answerId, never, questionId, expDate, personId, isCorrect)
VALUES (${params})
ON CONFLICT (personId, questionId) DO update
set never = EXCLUDED.never, expDate = EXCLUDED.expDate, isCorrect = EXCLUDED.isCorrect;`,
    values
  );
  return res;
};

export const getUserAnswersFromDB = async (id: any) => {
  const personId = id.personId;
  const res = await client.query(`SELECT * FROM user_answers WHERE personId = '${personId}'`);
  const convertedAnswers = [];
  for (const answer of res.rows) {
    const convertedAnswer = {
      personId: answer.personid,
      questionId: answer.questionid,
      expDate: answer.expdate,
      answerId: answer.answerid,
      isCorrect: answer.iscorrect,
      never: answer.never,
    };
    convertedAnswers.push(convertedAnswer);
  }
  return convertedAnswers;
};
