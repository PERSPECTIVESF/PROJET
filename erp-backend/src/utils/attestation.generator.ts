import { Document, Packer, Paragraph, TextRun } from "docx";
import { writeFileSync } from "fs";

export async function generateAttestation(nom: string, prenom: string, formation: string, dateFin: string) {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "Attestation de Formation",
                bold: true,
                size: 32,
              }),
            ],
          }),
          new Paragraph(""),
          new Paragraph(`Je soussigné(e), certifie que :`),
          new Paragraph(`Nom : ${nom}`),
          new Paragraph(`Prénom : ${prenom}`),
          new Paragraph(`a suivi la formation : ${formation}`),
          new Paragraph(`Date de fin : ${dateFin}`),
          new Paragraph(""),
          new Paragraph("Fait à Paris, le " + new Date().toLocaleDateString()),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const fileName = `attestation-${nom}-${prenom}.docx`;
  writeFileSync(`./documents/${fileName}`, buffer);
  return fileName;
}
