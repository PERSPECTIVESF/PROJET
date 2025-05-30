import { Document, Packer, Paragraph, TextRun } from "docx";
import { writeFileSync } from "fs";

export async function generateCertificat(nom: string, prenom: string, formation: string, dateFin: string) {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "Certificat de Réalisation",
                bold: true,
                size: 32,
              }),
            ],
          }),
          new Paragraph(""),
          new Paragraph(`Je certifie que :`),
          new Paragraph(`Nom : ${nom}`),
          new Paragraph(`Prénom : ${prenom}`),
          new Paragraph(`a réalisé la formation : "${formation}"`),
          new Paragraph(`Date de fin : ${dateFin}`),
          new Paragraph(""),
          new Paragraph("Fait à Paris, le " + new Date().toLocaleDateString()),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const fileName = `certificat-${nom}-${prenom}.docx`;
  writeFileSync(`./documents/${fileName}`, buffer);
  return fileName;
}
