import express from 'express';
import { getAllGrilles } from '../controllers/grille.controller';
import { createGrilleEvaluation } from '../controllers/grille.controller';
import { generateGrilleDoc } from '../controllers/grille.controller';

const router = express.Router();

router.post('/', createGrilleEvaluation);
router.get('/', getAllGrilles);
router.post('/:id/generate-doc', generateGrilleDoc);
export default router;
