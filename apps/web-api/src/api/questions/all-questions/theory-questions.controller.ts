import { Request, Response } from 'express';
import { getQuestionsAPI } from './theory-questions.service';

export const getQuestions = async (req: Request, res: Response) => {
  const theoryQuestions = await getQuestionsAPI();

  res.status(200).send({
    success: true,
    questions: theoryQuestions,
  });
};
