import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getAllApprenants = async (_: Request, res: Response) => {
  const data = await prisma.apprenant.findMany();
  res.json(data);
};

export const getApprenantById = async (req: Request, res: Response) => {
  const apprenant = await prisma.apprenant.findUnique({ where: { id: req.params.id } });
  if (!apprenant) return res.status(404).json({ message: "Non trouvé" });
  res.json(apprenant);
};

export const createApprenant = async (req: Request, res: Response) => {
  const data = req.body;
  const count = await prisma.apprenant.count();
  const code = `APP-${(count + 1).toString().padStart(4, '0')}`;
  const apprenant = await prisma.apprenant.create({ data: { ...data, code } });
  res.status(201).json(apprenant);
};

export const updateApprenant = async (req: Request, res: Response) => {
  const apprenant = await prisma.apprenant.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json(apprenant);
};

export const deleteApprenant = async (req: Request, res: Response) => {
  await prisma.apprenant.delete({ where: { id: req.params.id } });
  res.status(204).send();
};

export const optionsApprenant = async (_: Request, res: Response) => {
  res.header("Allow", "GET,POST,PUT,PATCH,DELETE,OPTIONS").send();
};
