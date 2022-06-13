import express from 'express';
import { setUserAnswers } from './userProgress.controller';

const router = express.Router();

router.post('/', setUserAnswers);

export default router;
