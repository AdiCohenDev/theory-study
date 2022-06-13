import client from '../../db';

export const saveUserAnswersInDB = async (userProgress) => {
  const keys = Object.keys(userProgress).join(',');
  const values = Object.values(userProgress)
    .map((prop) => `'${prop}'`)
    .join(',');
  return await client.query(`INSERT INTO user_answers (${keys}) VALUES (${values})`);
};
