import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// ✅ GET : toutes les entreprises
export const getAllEntreprises = async (_: Request, res: Response) => {
  const data = await prisma.entreprise.findMany();
  res.json(data);
};

// ✅ GET : une entreprise par ID
export const getEntrepriseById = async (req: Request, res: Response) => {
  const entreprise = await prisma.entreprise.findUnique({ where: { id: req.params.id } });
  if (!entreprise) return res.status(404).json({ message: "Non trouvé" });
  res.json(entreprise);
};

// ✅ POST : créer une entreprise
export const createEntreprise = async (req: Request, res: Response) => {
  const data = req.body;
  const entreprise = await prisma.entreprise.create({ data });
  res.status(201).json(entreprise);
};

// ✅ PUT / PATCH : mettre à jour une entreprise
export const updateEntreprise = async (req: Request, res: Response) => {
  const entreprise = await prisma.entreprise.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json(entreprise);
};

// ✅ DELETE : supprimer une entreprise
export const deleteEntreprise = async (req: Request, res: Response) => {
  await prisma.entreprise.delete({ where: { id: req.params.id } });
  res.status(204).send();
};

// ✅ OPTIONS
export const optionsEntreprise = async (_: Request, res: Response) => {
  res.header("Allow", "GET,POST,PUT,PATCH,DELETE,OPTIONS").send();
};
