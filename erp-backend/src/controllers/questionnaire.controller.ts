import { Request, Response } from 'express';
import { prisma } from '../../prisma/client';
import { generateQuestionnaireDocx } from '../utils/questionnaire.generator';
import path from 'path';

// ➕ Créer un questionnaire
export const createQuestionnaire = async (req: Request, res: Response) => {
  try {
    const {
      apprenantId,
      sessionId,
      date,
      satisfactionGlobale,
      remarques
    } = req.body;

    const nouveau = await prisma.questionnaireSatisfaction.create({
      data: {
        apprenantId,
        sessionId,
        date: new Date(date),
        satisfactionGlobale,
        remarques
      },
    });

    res.status(201).json({ message: 'Questionnaire créé avec succès', questionnaire: nouveau });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la création du questionnaire." });
  }
};

// 👁️ Récupérer tous les questionnaires
export const getAllQuestionnaires = async (req: Request, res: Response) => {
  try {
    const questionnaires = await prisma.questionnaireSatisfaction.findMany({
      orderBy: { date: 'desc' },
    });

    res.status(200).json(questionnaires);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération des questionnaires." });
  }
};

// 📄 Générer un document Word pour un questionnaire

export const generateQuestionnaireDoc = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const questionnaire = await prisma.questionnaireSatisfaction.findUnique({ where: { id } });

    if (!questionnaire) return res.status(404).json({ error: 'Questionnaire introuvable.' });

    const outputDir = path.join(__dirname, '../../documents');
    const fileName = `Questionnaire-${questionnaire.id}.docx`;
    const outputPath = path.join(outputDir, fileName);

    await generateQuestionnaireDocx(questionnaire, outputPath);

    const updated = await prisma.questionnaireSatisfaction.update({
      where: { id },
      data: { urlDocx: `/documents/${fileName}` }
    });

    res.status(200).json({ message: 'Document généré', questionnaire: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la génération du fichier.' });
  }
};