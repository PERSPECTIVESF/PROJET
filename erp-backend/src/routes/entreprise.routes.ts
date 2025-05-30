import { Router } from 'express';
import {
  getAllEntreprises,
  getEntrepriseById,
  createEntreprise,
  updateEntreprise,
  deleteEntreprise,
  optionsEntreprise
} from '../controllers/entreprise.controller';

const router = Router();

router.options('/', optionsEntreprise);
router.get('/', getAllEntreprises);
router.get('/:id', getEntrepriseById);
router.post('/', createEntreprise);
router.put('/:id', updateEntreprise);
router.patch('/:id', updateEntreprise);
router.delete('/:id', deleteEntreprise);

export default router;
