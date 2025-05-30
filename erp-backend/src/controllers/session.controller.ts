import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getAllSessions = async (_: Request, res: Response) => {
  const data = await prisma.session.findMany({ include: { formation: true } });
  res.json(data);
};

export const createSession = async (req: Request, res: Response) => {
  const data = await prisma.session.create({ data: req.body });
  res.status(201).json(data);
};
