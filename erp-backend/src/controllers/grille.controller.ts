import { Request, Response } from 'express';
import { prisma } from '../../prisma/client';
import { generateGrilleEvaluationDocx } from '../utils/grille-evaluation.generator';
import path from 'path';

export const createGrilleEvaluation = async (req: Request, res: Response) => {
  try {
    const {
      typeCible,
      cibleId,
      sessionId,
      titre,
      note,
      commentaire,
      dateEvaluation,
    } = req.body;

    const nouvelleGrille = await prisma.grilleEvaluation.create({
      data: {
        typeCible,
        cibleId,
        sessionId,
        titre,
        note,
        commentaire,
        dateEvaluation: new Date(dateEvaluation),
      },
    });

    res.status(201).json({ message: 'Grille créée avec succès', grille: nouvelleGrille });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la création de la grille d'évaluation." });
  }
};

export const getAllGrilles = async (req: Request, res: Response) => {
  try {
    const grilles = await prisma.grilleEvaluation.findMany({
      orderBy: { dateEvaluation: 'desc' }
    });
    res.status(200).json(grilles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération des grilles." });
  }
};

export const generateGrilleDoc = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const grille = await prisma.grilleEvaluation.findUnique({ where: { id } });

    if (!grille) return res.status(404).json({ error: 'Grille non trouvée.' });

    const outputDir = path.join(__dirname, '../../documents');
    const docxFileName = `Grille-${grille.id}.docx`;
    const outputPath = path.join(outputDir, docxFileName);

    await generateGrilleEvaluationDocx(grille, outputPath);

    const updatedGrille = await prisma.grilleEvaluation.update({
      where: { id },
      data: { urlDocx: `/documents/${docxFileName}` },
    });

    res.status(200).json({ message: 'Grille exportée en .docx', grille: updatedGrille });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la génération du fichier." });
  }
};
