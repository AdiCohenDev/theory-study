import client from '../../db';
import { IUser } from '../../../../web-app/src/app/features/auth/shared/models/user';

export const saveUserInDB = async (user: IUser) => {
  const keys = Object.keys(user).join(',');
  const values = Object.values(user)
    .map((prop) => `'${prop}'`)
    .join(',');
  return await client.query(`INSERT INTO persons (${keys}) VALUES (${values})`);
};
