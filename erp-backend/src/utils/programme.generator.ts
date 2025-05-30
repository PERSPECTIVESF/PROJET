import { Document, Packer, Paragraph, TextRun } from "docx";
import { writeFileSync } from "fs";

export async function generateProgramme(intitule: string, objectifs: string, publicCible: string, prerequis: string, contenu: string[], modalites: string, duree: string) {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun("PROGRAMME DE FORMATION"),
              new TextRun({ text: `\n\nIntitulé : ${intitule}`, break: 1 }),
              new TextRun({ text: `Objectifs pédagogiques : ${objectifs}`, break: 1 }),
              new TextRun({ text: `Public concerné : ${publicCible}`, break: 1 }),
              new TextRun({ text: `Pré-requis : ${prerequis}`, break: 1 }),
              new TextRun({ text: `Durée : ${duree}`, break: 1 }),
              new TextRun({ text: `Modalités pédagogiques : ${modalites}`, break: 1 }),
              new TextRun({ text: `\nContenu détaillé :`, break: 2 }),
            ],
          }),
          ...contenu.map((item, index) =>
            new Paragraph(`${index + 1}. ${item}`)
          ),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const fileName = `programme-${intitule.replace(/\s+/g, "_")}.docx`;
  writeFileSync(`./documents/${fileName}`, buffer);
  return fileName;
}
