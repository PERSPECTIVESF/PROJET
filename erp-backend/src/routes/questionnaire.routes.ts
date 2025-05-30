import express from 'express';
import {
  createQuestionnaire,
  getAllQuestionnaires,
  generateQuestionnaireDoc
} from '../controllers/questionnaire.controller';

const router = express.Router();

router.post('/', createQuestionnaire);
router.get('/', getAllQuestionnaires);
router.post('/:id/generate-doc', generateQuestionnaireDoc);

export default router;
