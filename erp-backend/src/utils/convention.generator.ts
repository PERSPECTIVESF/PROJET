import { Document, Packer, Paragraph, TextRun } from "docx";
import { writeFileSync } from "fs";

export async function generateConvention(nomEntreprise: string, siret: string, nomStagiaire: string, formation: string, dateDebut: string, dateFin: string, lieu: string) {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun("CONVENTION DE FORMATION"),
              new TextRun({
                text: "\n\nEntre les soussignés :",
                break: 1,
              }),
              new TextRun({
                text: `L'organisme de formation (PERSPECTIVES FORMATION)`,
                bold: true,
                break: 2,
              }),
              new TextRun({
                text: `Et l'entreprise : ${nomEntreprise} (SIRET : ${siret})`,
                break: 2,
              }),
              new TextRun({
                text: `Pour la formation de : ${nomStagiaire}`,
                break: 2,
              }),
              new TextRun({
                text: `Intitulé de la formation : ${formation}`,
                break: 2,
              }),
              new TextRun({
                text: `Dates : du ${dateDebut} au ${dateFin}`,
                break: 2,
              }),
              new TextRun({
                text: `Lieu de formation : ${lieu}`,
                break: 2,
              }),
              new TextRun({
                text: "\n\nFait en double exemplaire à Paris, le " + new Date().toLocaleDateString(),
                break: 2,
              }),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const fileName = `convention-${nomStagiaire.replace(" ", "_")}.docx`;
  writeFileSync(`./documents/${fileName}`, buffer);
  return fileName;
}