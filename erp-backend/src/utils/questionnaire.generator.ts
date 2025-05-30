import fs from 'fs';
import { Document, Packer, Paragraph, TextRun } from 'docx';

export const generateQuestionnaireDocx = async (data: any, outputPath: string) => {
  const { date, satisfactionGlobale, remarques } = data;

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: "QUESTIONNAIRE DE SATISFACTION", bold: true, size: 32 }),
            ],
          }),
          new Paragraph({}),
          new Paragraph({
            children: [new TextRun(`Date : ${new Date(date).toLocaleDateString()}`)],
          }),
          new Paragraph({ children: [new TextRun(`Satisfaction globale (sur 5) : ${satisfactionGlobale}`)] }),
          new Paragraph({}),
          new Paragraph({ children: [new TextRun("Remarques :")] }),
          new Paragraph({ children: [new TextRun(remarques || "Aucune")] }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
};
