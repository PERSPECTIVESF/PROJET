import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

interface JwtPayload {
  userId: string;
  role: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Récupérer le token dans l’en-tête Authorization : Bearer <token>
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token manquant' });

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    // Ajouter les infos utilisateur dans la requête
    req.user = {
      id: payload.userId,
      role: payload.role,
    };
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token invalide ou expiré' });
  }
};
