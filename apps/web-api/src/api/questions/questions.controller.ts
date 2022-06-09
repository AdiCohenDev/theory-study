import { Request, Response } from 'express';
import { getQuestionsAPI } from './questions.service';

export const getQuestions = async (req: Request, res: Response) => {
  const result = await getQuestionsAPI();

  res.status(200).send({
    success: true,
    questions: result,
  });
};
