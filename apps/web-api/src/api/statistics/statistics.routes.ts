import express from 'express';
import { getProgressPieData } from './statistics.controller';

const router = express.Router();

router.get('/', getProgressPieData);

export default router;
