import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getAllFormations = async (_: Request, res: Response) => {
  const data = await prisma.formation.findMany();
  res.json(data);
};

export const createFormation = async (req: Request, res: Response) => {
  const count = await prisma.formation.count();
  const code = `FORM-${(count + 1).toString().padStart(4, '0')}`;
  const data = await prisma.formation.create({ data: { ...req.body, code } });
  res.status(201).json(data);
};
