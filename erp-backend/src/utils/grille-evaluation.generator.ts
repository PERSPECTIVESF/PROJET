import fs from 'fs';
import { Document, Packer, Paragraph, TextRun } from 'docx';

export const generateGrilleEvaluationDocx = async (data: any, outputPath: string) => {
  const { typeCible, titre, note, commentaire, dateEvaluation } = data;

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({ children: [new TextRun({ text: titre, bold: true, size: 32 })] }),
          new Paragraph({}),
          new Paragraph({ children: [new TextRun(`Type de destinataire : ${typeCible}`)] }),
          new Paragraph({ children: [new TextRun(`Note attribuée : ${note}/10`)] }),
          new Paragraph({ children: [new TextRun(`Date d'évaluation : ${new Date(dateEvaluation).toLocaleDateString()}`)] }),
          new Paragraph({ children: [new TextRun(`Commentaire :`)] }),
          new Paragraph({ children: [new TextRun(commentaire || 'Aucun')] }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
};
