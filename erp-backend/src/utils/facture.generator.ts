import fs from 'fs';
import { Document, Packer, Paragraph, TextRun } from 'docx';

export const generateFactureDocx = async (data: any, outputPath: string) => {
  const {
    numeroFacture,
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
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: `FACTURE`, bold: true, size: 32 }),
            ],
          }),
          new Paragraph({}),
          new Paragraph({
            children: [
              new TextRun(`Numéro : ${numeroFacture}`),
              new TextRun(`\t\tDate : ${dateEmission.toLocaleDateString()}`),
            ],
          }),
          new Paragraph({}),
          new Paragraph({ children: [new TextRun({ text: `Client`, bold: true })] }),
          new Paragraph({ children: [new TextRun(`Entreprise : ${entreprise.nom}`)] }),
          new Paragraph({ children: [new TextRun(`Adresse : ${entreprise.adresse || 'N/A'}`)] }),
          new Paragraph({}),
          new Paragraph({ children: [new TextRun({ text: `Formation`, bold: true })] }),
          new Paragraph({ children: [new TextRun(`Intitulé : ${formation.titre}`)] }),
          new Paragraph({}),
          new Paragraph({ children: [new TextRun({ text: `Montants`, bold: true })] }),
          new Paragraph({ children: [new TextRun(`Montant HT : ${montantHT.toFixed(2)} €`)] }),
          new Paragraph({ children: [new TextRun(`TVA : ${montantTVA.toFixed(2)} €`)] }),
          new Paragraph({ children: [new TextRun(`Total TTC : ${montantTTC.toFixed(2)} €`)] }),
          new Paragraph({}),
          new Paragraph({
            children: [
              new TextRun(`Paiement dû à réception de la facture. Merci.`),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
};
