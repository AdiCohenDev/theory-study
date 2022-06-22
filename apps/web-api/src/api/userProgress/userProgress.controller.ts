import { Request, Response } from 'express';
import { getUserAnswersFromDB, saveUserAnswersInDB } from './userProgress.service';

export const setUserAnswers = async (req: Request, res: Response) => {
  const result = await saveUserAnswersInDB(req.body);

  res.status(200).send({
    success: true,
    result,
  });
};

export const getUserAnswers = async (req: Request, res: Response) => {
  const result = await getUserAnswersFromDB(req.query);

  res.status(200).send({
    success: true,
    result,
  });
};
