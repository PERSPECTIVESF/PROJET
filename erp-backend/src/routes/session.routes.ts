import { Router } from 'express';
import { getAllSessions, createSession } from '../controllers/session.controller';

const router = Router();
router.get('/', getAllSessions);
router.post('/', createSession);

export default router;
