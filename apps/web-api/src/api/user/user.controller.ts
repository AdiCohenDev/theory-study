import { Request, Response } from 'express';
import { uuid } from 'uuidv4';
import { saveUserInDB } from './user.service';

export const setUser = async (req: Request, res: Response) => {
  const user = {
    personId: uuid(),
    ...req.body,
  };

  const result = await saveUserInDB(user);

  res.status(200).send({
    success: true,
    rowCount: result.rowCount,
  });
};
