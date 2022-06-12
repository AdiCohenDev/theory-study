import { Request, Response } from 'express';
import { getQuestionsAPI } from './questions.service';
import NodeCache from 'node-cache';

const nodeCache = new NodeCache();

export const getQuestions = async (req: Request, res: Response) => {
  const CACHE_KEY = 'theory_questions';
  let theoryQuestions = nodeCache.get(CACHE_KEY);
  if (!theoryQuestions) {
    theoryQuestions = await getQuestionsAPI();
    nodeCache.set(CACHE_KEY, theoryQuestions);
  }

  res.set('Cache-Control', 'public, max-age=604800'); // one week
  res.status(200).send({
    success: true,
    questions: theoryQuestions,
  });
};
