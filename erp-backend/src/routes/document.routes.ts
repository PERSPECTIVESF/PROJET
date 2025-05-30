import express from 'express';
import {
  getAllDocuments,
  createDocument,
  deleteDocument,
  genererConvocation,
  genererAttestation,
  genererCertificat,
  genererConvention,
  genererProgramme,
  genererEmargement,
  genererSousTraitance,
  generateDevis,
  generateFacture
} from '../controllers/document.controller';

const router = express.Router();

// Routes CRUD document
router.get('/', getAllDocuments);
router.post('/', createDocument);
router.delete('/:id', deleteDocument);

// Routes génération de documents
router.post('/generate/convocation', genererConvocation);
router.post('/generate/attestation', genererAttestation);
router.post('/generate/certificat', genererCertificat);
router.post('/generate/convention', genererConvention);
router.post('/generate/programme', genererProgramme);
router.post('/generate/emargement', genererEmargement);
router.post('/generate/soustraitance', genererSousTraitance);

// Routes pour les documents spécifiques
router.post('/generate/devis', generateDevis); // ✅ celle qu’on vient d’ajouter
router.post('/generate/facture', generateFacture); // ✅ celle qu’on vient d’ajouter

export default router;
