import { Router } from 'express';
import { getAllFormations, createFormation } from '../controllers/formation.controller';

const router = Router();
router.get('/', getAllFormations);
router.post('/', createFormation);

export default router;
