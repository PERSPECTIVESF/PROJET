import { Router } from 'express';
import {
  getAllApprenants,
  getApprenantById,
  createApprenant,
  updateApprenant,
  deleteApprenant,
  optionsApprenant
} from '../controllers/apprenant.controller';

const router = Router();

router.options('/', optionsApprenant);
router.get('/', getAllApprenants);
router.get('/:id', getApprenantById);
router.post('/', createApprenant);
router.put('/:id', updateApprenant);
router.patch('/:id', updateApprenant);
router.delete('/:id', deleteApprenant);

export default router;
