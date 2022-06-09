import express from 'express';
import { getQuestions } from './questions.controller';

const router = express.Router();

router.post('/', getQuestions);

export default router;
