import { Request, Response } from 'express';
import { prisma } from '../../prisma/client';

// ✅ Créer un particulier
export const createParticulier = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const particulier = await prisma.particulier.create({ data });
    res.status(201).json(particulier);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la création du particulier." });
  }
};

// ✅ Obtenir tous les particuliers
export const getAllParticuliers = async (_: Request, res: Response) => {
  try {
    const particuliers = await prisma.particulier.findMany({
      include: { entreprise: true },
      orderBy: { nom: 'asc' }
    });
    res.status(200).json(particuliers);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération." });
  }
};

// ✅ Obtenir un particulier par ID
export const getParticulierById = async (req: Request, res: Response) => {
  try {
    const particulier = await prisma.particulier.findUnique({
      where: { id: req.params.id },
      include: { entreprise: true }
    });

    if (!particulier) return res.status(404).json({ error: 'Particulier introuvable' });
    res.status(200).json(particulier);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération du particulier." });
  }
};

// ✅ Modifier un particulier
export const updateParticulier = async (req: Request, res: Response) => {
  try {
    const particulier = await prisma.particulier.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.status(200).json(particulier);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la mise à jour." });
  }
};

// ✅ Supprimer un particulier
export const deleteParticulier = async (req: Request, res: Response) => {
  try {
    await prisma.particulier.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression." });
  }
};
