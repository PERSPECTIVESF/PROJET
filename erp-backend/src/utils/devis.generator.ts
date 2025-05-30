import fs from 'fs';
import { Document, Packer, Paragraph, TextRun } from 'docx';

/**
 * Génère un fichier .docx de devis de formation
 * @param data Données du devis
 * @param outputPath Chemin de sauvegarde du fichier .docx
 */
export const generateDevisDocx = async (data: any, outputPath: string) => {
  const {
    numeroDevis,
    dateEmission,
    entreprise,
    formation,
    montantHT,
    montantTVA,
    montantTTC,
  } = data;

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: `DEVIS DE FORMATION`,
                bold: true,
                size: 32,
              }),
            ],
          }),
          new Paragraph({}),
          new Paragraph({
            children: [
              new TextRun(`Numéro : ${numeroDevis}`),
              new TextRun(`\t\tDate : ${dateEmission.toLocaleDateString()}`),
            ],
          }),
          new Paragraph({}),
          new Paragraph({
            children: [new TextRun({ text: `Entreprise : ${entreprise.nom}`, bold: true })],
          }),
          new Paragraph({
            children: [new TextRun(`Adresse : ${entreprise.adresse || 'N/A'}`)],
          }),
          new Paragraph({}),
          new Paragraph({
            children: [new TextRun({ text: `Formation proposée`, bold: true })],
          }),
          new Paragraph({
            children: [new TextRun(`Intitulé : ${formation.titre}`)],
          }),
          new Paragraph({
            children: [new TextRun(`Durée : ${formation.duree || 'à préciser'} heures`)],
          }),
          new Paragraph({}),
          new Paragraph({
            children: [new TextRun({ text: `Montant`, bold: true })],
          }),
          new Paragraph({
            children: [new TextRun(`Montant HT : ${montantHT.toFixed(2)} €`)],
          }),
          new Paragraph({
            children: [new TextRun(`TVA : ${montantTVA.toFixed(2)} €`)],
          }),
          new Paragraph({
            children: [new TextRun(`Montant TTC : ${montantTTC.toFixed(2)} €`)],
          }),
          new Paragraph({}),
          new Paragraph({
            children: [
              new TextRun({
                text: `Conditions : Ce devis est valable 30 jours. Paiement à réception de facture.`,
              }),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
};
