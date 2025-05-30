import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../../prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, motDePasse, role, nom, prenom } = req.body;

    // Vérifier si utilisateur existe déjà
    const existingUser = await prisma.utilisateur.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'Email déjà utilisé' });

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(motDePasse, 10);

    // Créer utilisateur
    const utilisateur = await prisma.utilisateur.create({
      data: {
        email,
        motDePasse: hashedPassword,
        role,
        nom,
        prenom,
      },
    });

    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, motDePasse } = req.body;

    const utilisateur = await prisma.utilisateur.findUnique({ where: { email } });
    if (!utilisateur) return res.status(400).json({ error: 'Email ou mot de passe invalide' });

    // Vérifier le mot de passe
    const isValid = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
    if (!isValid) return res.status(400).json({ error: 'Email ou mot de passe invalide' });

    // Générer token JWT
    const token = jwt.sign({ userId: utilisateur.id, role: utilisateur.role }, JWT_SECRET, {
      expiresIn: '12h',
    });

    res.status(200).json({ token, utilisateur: { id: utilisateur.id, email: utilisateur.email, role: utilisateur.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la connexion' });
  }
};
