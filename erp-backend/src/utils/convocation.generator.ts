import { Document, Packer, Paragraph, TextRun } from "docx";
import { writeFileSync } from "fs";

export async function generateConvocation(nom: string, prenom: string, formation: string, date: string) {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: `Convocation à la formation`,
                bold: true,
                size: 32,
              }),
            ],
          }),
          new Paragraph(""),
          new Paragraph(`Nom : ${nom}`),
          new Paragraph(`Prénom : ${prenom}`),
          new Paragraph(`Formation : ${formation}`),
          new Paragraph(`Date : ${date}`),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const fileName = `convocation-${nom}-${prenom}.docx`;
  writeFileSync(`./documents/${fileName}`, buffer);

  return fileName;
}
