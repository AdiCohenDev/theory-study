import express from 'express';
import { getUserAnswers, setUserAnswers } from './user-answers.controller';

const router = express.Router();

router.post('/', setUserAnswers);
router.get('/', getUserAnswers);

export default router;
