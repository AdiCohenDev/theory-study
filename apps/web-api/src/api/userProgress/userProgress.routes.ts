import express from 'express';
import { getUserAnswers, setUserAnswers } from './userProgress.controller';

const router = express.Router();

router.post('/', setUserAnswers);
router.get('/', getUserAnswers);

export default router;
