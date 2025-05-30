import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ✅ Créer un utilisateur
export const createUtilisateur = async (req: Request, res: Response) => {
  try {
    const {
      email,
      motDePasse,
      role,
      nom,
      prenom,
      formateurId,
      apprenantId,
      entrepriseId,
      particulierId
    } = req.body;

    console.log("📥 Données reçues :", req.body);

    const utilisateur = await prisma.utilisateur.create({
      data: {
        email,
        motDePasse,
        role,
        nom,
        prenom,
        formateur: formateurId && formateurId !== "" ? { connect: { id: formateurId } } : undefined,
        apprenant: apprenantId && apprenantId !== "" ? { connect: { id: apprenantId } } : undefined,
        entreprise: entrepriseId && entrepriseId !== "" ? { connect: { id: entrepriseId } } : undefined,
        particulier: particulierId && particulierId !== "" ? { connect: { id: particulierId } } : undefined,
      },
    });

    console.log("✅ Utilisateur créé :", utilisateur);
    res.status(201).json(utilisateur);

  } catch (error: any) {
    console.error("❌ Erreur lors de la création :", error.message);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Lister tous les utilisateurs
export const getAllUtilisateurs = async (_req: Request, res: Response) => {
  try {
    const utilisateurs = await prisma.utilisateur.findMany({
      include: {
        formateur: true,
        apprenant: true,
        entreprise: true,
        particulier: true,
      },
    });
    res.status(200).json(utilisateurs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs." });
  }
};

// ✅ Voir un utilisateur par ID
export const getUtilisateurById = async (req: Request, res: Response) => {
  try {
    const utilisateur = await prisma.utilisateur.findUnique({
      where: { id: req.params.id },
      include: {
        formateur: true,
        apprenant: true,
        entreprise: true,
        particulier: true,
      },
    });

    if (!utilisateur) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    res.status(200).json(utilisateur);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération." });
  }
};

// ✅ Modifier un utilisateur
export const updateUtilisateur = async (req: Request, res: Response) => {
  try {
    const { formateurId, apprenantId, entrepriseId, particulierId, ...rest } = req.body;

    const utilisateur = await prisma.utilisateur.update({
      where: { id: req.params.id },
      data: {
        ...rest,
        formateur: formateurId ? { connect: { id: formateurId } } : undefined,
        apprenant: apprenantId ? { connect: { id: apprenantId } } : undefined,
        entreprise: entrepriseId ? { connect: { id: entrepriseId } } : undefined,
        particulier: particulierId ? { connect: { id: particulierId } } : undefined,
      },
    });

    res.status(200).json(utilisateur);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la mise à jour du compte utilisateur." });
  }
};
// ✅ Supprimer un utilisateur
export const deleteUtilisateur = async (req: Request, res: Response) => {
  try {
    await prisma.utilisateur.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la suppression du compte utilisateur." });
  }
};
