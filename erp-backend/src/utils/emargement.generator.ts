import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType } from "docx";
import { writeFileSync } from "fs";

export async function generateEmargement(nomFormation: string, date: string, lieu: string, participants: { nom: string, prenom: string }[]) {
  const tableRows = [
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph("Nom")], width: { size: 33, type: WidthType.PERCENTAGE } }),
        new TableCell({ children: [new Paragraph("Prénom")], width: { size: 33, type: WidthType.PERCENTAGE } }),
        new TableCell({ children: [new Paragraph("Signature")], width: { size: 34, type: WidthType.PERCENTAGE } }),
      ]
    }),
    ...participants.map(p =>
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph(p.nom)] }),
          new TableCell({ children: [new Paragraph(p.prenom)] }),
          new TableCell({ children: [new Paragraph("")] }),
        ]
      })
    )
  ];

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun("FEUILLE D’ÉMARGEMENT"),
              new TextRun({ text: `\nFormation : ${nomFormation}`, break: 1 }),
              new TextRun({ text: `Date : ${date}`, break: 1 }),
              new TextRun({ text: `Lieu : ${lieu}`, break: 1 }),
            ],
          }),
          new Paragraph(" "),
          new Table({ rows: tableRows }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const fileName = `emargement-${nomFormation.replace(/\s+/g, "_")}.docx`;
  writeFileSync(`./documents/${fileName}`, buffer);
  return fileName;
}
