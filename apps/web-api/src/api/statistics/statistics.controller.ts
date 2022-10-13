import { Request, Response } from 'express';
import { getUserProgressData } from './statistics.service';

export const getProgressPieData = async (req: Request, res: Response) => {
  const progressData = await getUserProgressData(req.query);

  res.status(200).send({
    success: true,
    pieData: progressData.pieData,
    allQuestions: progressData.allQuestions,
  });
};
