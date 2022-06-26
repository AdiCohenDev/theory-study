import express from 'express';
import { getQuestions } from './theory-questions.controller';

const router = express.Router();

router.get('/', getQuestions);

export default router;
