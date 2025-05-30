import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// Lister tous les inscrits d'une session
export const getParticipantsBySession = async (req: Request, res: Response) => {
  const sessionId = req.params.sessionId;
  const data = await prisma.sessionApprenant.findMany({
    where: { sessionId },
    include: { apprenant: true }
  });
  res.json(data);
};

// Inscrire un apprenant à une session
export const inscrireApprenant = async (req: Request, res: Response) => {
  try {
    const { sessionId, apprenantId } = req.body;

    const data = await prisma.sessionApprenant.create({
      data: { sessionId, apprenantId }
    });

    res.status(201).json(data);
  } catch (error) {
    console.error("❌ Erreur inscription :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Désinscrire un apprenant
export const desinscrireApprenant = async (req: Request, res: Response) => {
  const { sessionId, apprenantId } = req.params;
  await prisma.sessionApprenant.delete({
    where: { sessionId_apprenantId: { sessionId, apprenantId } }
  });
  res.status(204).send();
};
