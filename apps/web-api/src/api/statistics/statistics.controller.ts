import { Request, Response } from 'express';
import { getUserProgressData } from './statistics.service';

export const getProgressPieData = async (req: Request, res: Response) => {
  const theoryQuestions = await getUserProgressData(req.query);

  res.status(200).send({
    success: true,
    pieData: theoryQuestions,
  });
};
