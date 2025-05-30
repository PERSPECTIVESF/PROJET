import express from 'express';
import {
  createParticulier,
  getAllParticuliers,
  getParticulierById,
  updateParticulier,
  deleteParticulier
} from '../controllers/particulier.controller';

const router = express.Router();

router.post('/', createParticulier);
router.get('/', getAllParticuliers);
router.get('/:id', getParticulierById);
router.put('/:id', updateParticulier);
router.delete('/:id', deleteParticulier);

export default router;
