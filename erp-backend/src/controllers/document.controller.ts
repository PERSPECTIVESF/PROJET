import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import path from "path";

const prisma = new PrismaClient();

export const getAllDocuments = async (_: Request, res: Response) => {
  const data = await prisma.document.findMany();
  res.json(data);
};

export const createDocument = async (req: Request, res: Response) => {
  try {
    const data = await prisma.document.create({ data: req.body });
    res.status(201).json(data);
  } catch (error) {
    console.error("❌ Erreur création document :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

export const deleteDocument = async (req: Request, res: Response) => {
  await prisma.document.delete({ where: { id: req.params.id } });
  res.status(204).send();
};


import { generateConvocation } from "../utils/convocation.generator";

export const genererConvocation = async (req: Request, res: Response) => {
  const { nom, prenom, formation, date } = req.body;

  try {
    const fileName = await generateConvocation(nom, prenom, formation, date);
    res.status(201).json({ message: "Document généré", fileName });
  } catch (error) {
    console.error("Erreur génération convocation :", error);
    res.status(500).json({ message: "Erreur génération document" });
  }
};


import { generateAttestation } from "../utils/attestation.generator";

export const genererAttestation = async (req: Request, res: Response) => {
  const { nom, prenom, formation, dateFin } = req.body;

  try {
    const fileName = await generateAttestation(nom, prenom, formation, dateFin);
    res.status(201).json({ message: "Attestation générée", fileName });
  } catch (error) {
    console.error("Erreur génération attestation :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};


import { generateCertificat } from "../utils/certificat.generator";

export const genererCertificat = async (req: Request, res: Response) => {
  const { nom, prenom, formation, dateFin } = req.body;

  try {
    const fileName = await generateCertificat(nom, prenom, formation, dateFin);
    res.status(201).json({ message: "Certificat généré", fileName });
  } catch (error) {
    console.error("Erreur génération certificat :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};


import { generateConvention } from "../utils/convention.generator";

export const genererConvention = async (req: Request, res: Response) => {
  const {
    nomEntreprise,
    siret,
    nomStagiaire,
    formation,
    dateDebut,
    dateFin,
    lieu
  } = req.body;

  try {
    const fileName = await generateConvention(nomEntreprise, siret, nomStagiaire, formation, dateDebut, dateFin, lieu);
    res.status(201).json({ message: "Convention générée", fileName });
  } catch (error) {
    console.error("Erreur génération convention :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};


import { generateProgramme } from "../utils/programme.generator";

export const genererProgramme = async (req: Request, res: Response) => {
  const {
    intitule,
    objectifs,
    publicCible,
    prerequis,
    contenu,
    modalites,
    duree
  } = req.body;

  try {
    const fileName = await generateProgramme(intitule, objectifs, publicCible, prerequis, contenu, modalites, duree);
    res.status(201).json({ message: "Programme généré", fileName });
  } catch (error) {
    console.error("Erreur génération programme :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};


import { generateEmargement } from "../utils/emargement.generator";

export const genererEmargement = async (req: Request, res: Response) => {
  const { nomFormation, date, lieu, participants } = req.body;

  try {
    const fileName = await generateEmargement(nomFormation, date, lieu, participants);
    res.status(201).json({ message: "Feuille d’émargement générée", fileName });
  } catch (error) {
    console.error("Erreur génération émargement :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};


import { generateSousTraitance } from "../utils/sousTraitance.generator";

export const genererSousTraitance = async (req: Request, res: Response) => {
  const {
    nomFormateur,
    siret,
    email,
    formation,
    dateDebut,
    dateFin,
    lieu,
    montant
  } = req.body;

  try {
    const fileName = await generateSousTraitance(nomFormateur, siret, email, formation, dateDebut, dateFin, lieu, montant);
    res.status(201).json({ message: "Contrat généré", fileName });
  } catch (error) {
    console.error("Erreur génération contrat :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};


import { generateDevisDocx } from "../utils/devis.generator";

export const generateDevis = async (req: Request, res: Response) => {
  try {
    const { entrepriseId, formationId, montantHT, montantTVA } = req.body;

    const entreprise = await prisma.entreprise.findUnique({ where: { id: entrepriseId } });
    const formation = await prisma.formation.findUnique({ where: { id: formationId } });

    if (!entreprise || !formation) {
      return res.status(404).json({ error: 'Entreprise ou Formation non trouvée.' });
    }

    const numeroDevis = `DEV-${Date.now()}`;
    const dateEmission = new Date();
    const montantTTC = montantHT + montantTVA;

    const devisData = {
      numeroDevis,
      dateEmission,
      entreprise,
      formation,
      montantHT,
      montantTVA,
      montantTTC,
    };

    const outputDir = path.join(__dirname, '../../documents');
    const docxFileName = `${numeroDevis}.docx`;
    const outputPath = path.join(outputDir, docxFileName);

    await generateDevisDocx(devisData, outputPath);

    const devis = await prisma.devis.create({
      data: {
        numero: numeroDevis,
        entrepriseId,
        formationId,
        dateEmission,
        montantHT,
        montantTVA,
        montantTTC,
        urlDocx: `/documents/${docxFileName}`,
      },
    });

    return res.status(200).json({ message: 'Devis généré avec succès', devis });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la génération du devis.' });
  }
};

import { generateFactureDocx } from '../utils/facture.generator';


export const generateFacture = async (req: Request, res: Response) => {
  try {
    const { entrepriseId, formationId, montantHT, montantTVA } = req.body;

    const entreprise = await prisma.entreprise.findUnique({ where: { id: entrepriseId } });
    const formation = await prisma.formation.findUnique({ where: { id: formationId } });

    if (!entreprise || !formation) {
      return res.status(404).json({ error: 'Entreprise ou Formation non trouvée.' });
    }

    const numeroFacture = `FAC-${Date.now()}`;
    const dateEmission = new Date();
    const montantTTC = montantHT + montantTVA;

    const factureData = {
      numeroFacture,
      dateEmission,
      entreprise,
      formation,
      montantHT,
      montantTVA,
      montantTTC,
    };

    const outputDir = path.join(__dirname, '../../documents');
    const docxFileName = `${numeroFacture}.docx`;
    const outputPath = path.join(outputDir, docxFileName);

    await generateFactureDocx(factureData, outputPath);

    const facture = await prisma.facture.create({
      data: {
        numero: numeroFacture,
        entrepriseId,
        formationId,
        dateEmission,
        montantHT,
        montantTVA,
        montantTTC,
        urlDocx: `/documents/${docxFileName}`,
        statut: 'en_attente'
      },
    });

    return res.status(200).json({ message: 'Facture générée avec succès', facture });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la génération de la facture.' });
  }
};