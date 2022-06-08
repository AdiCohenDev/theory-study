import express from 'express';
import { setUser } from './user.controller';

const router = express.Router();

router.post('/', setUser);

export default router;
