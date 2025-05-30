import { Router } from 'express';
import {
  getParticipantsBySession,
  inscrireApprenant,
  desinscrireApprenant
} from '../controllers/sessionApprenant.controller';

const router = Router();

router.get('/session/:sessionId', getParticipantsBySession);
router.post('/', inscrireApprenant);
router.delete('/:sessionId/:apprenantId', desinscrireApprenant);

export default router;
