import { Document, Packer, Paragraph, TextRun } from "docx";
import { writeFileSync } from "fs";

export async function generateSousTraitance(nomFormateur: string, siret: string, email: string, formation: string, dateDebut: string, dateFin: string, lieu: string, montant: string) {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun("CONTRAT DE SOUS-TRAITANCE"),
              new TextRun({ text: "\n\nEntre :", break: 2 }),
              new TextRun({ text: `L’organisme de formation PERSPECTIVES FORMATION`, bold: true }),
              new TextRun({ text: "\n\nEt le prestataire :", break: 2 }),
              new TextRun({ text: `${nomFormateur} (SIRET : ${siret}) – ${email}` }),
              new TextRun({ text: "\n\nObjet du contrat :", break: 2 }),
              new TextRun({ text: `Animation de la formation "${formation}"`, italics: true }),
              new TextRun({ text: ` du ${dateDebut} au ${dateFin}, à ${lieu}.`, break: 1 }),
              new TextRun({ text: `Montant de la prestation : ${montant} € HT`, break: 2 }),
              new TextRun({ text: `Le prestataire s'engage à respecter le référentiel qualité Qualiopi, le RGPD, ainsi que toutes les obligations de confidentialité.` }),
              new TextRun({ text: "\n\nFait à Paris, le " + new Date().toLocaleDateString(), break: 2 }),
            ]
          })
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  const fileName = `contrat-sous-traitance-${nomFormateur.replace(/\s+/g, "_")}.docx`;
  writeFileSync(`./documents/${fileName}`, buffer);
  return fileName;
}
