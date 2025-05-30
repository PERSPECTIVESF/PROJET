import express from 'express';
import {
  createUtilisateur,
  getAllUtilisateurs,
  getUtilisateurById,
  updateUtilisateur,
  deleteUtilisateur
} from '../controllers/utilisateur.controller';

const router = express.Router();

router.post('/', createUtilisateur);
router.get('/', authenticateToken, getAllUtilisateurs);
router.get('/:id', authenticateToken, getUtilisateurById);
router.put('/:id', authenticateToken, updateUtilisateur);
router.delete('/:id', authenticateToken, deleteUtilisateur);

export default router;
