/*
  Warnings:

  - A unique constraint covering the columns `[formateurId]` on the table `Utilisateur` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[apprenantId]` on the table `Utilisateur` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[particulierId]` on the table `Utilisateur` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[entrepriseId]` on the table `Utilisateur` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Utilisateur" ADD COLUMN     "apprenantId" TEXT,
ADD COLUMN     "entrepriseId" TEXT,
ADD COLUMN     "formateurId" TEXT,
ADD COLUMN     "particulierId" TEXT,
ALTER COLUMN "nom" DROP NOT NULL,
ALTER COLUMN "prenom" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Formateur" (
    "id" TEXT NOT NULL,
    "civilite" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "specialite" TEXT,
    "organisme" TEXT,
    "interne" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Formateur_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Formateur_email_key" ON "Formateur"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_formateurId_key" ON "Utilisateur"("formateurId");

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_apprenantId_key" ON "Utilisateur"("apprenantId");

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_particulierId_key" ON "Utilisateur"("particulierId");

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_entrepriseId_key" ON "Utilisateur"("entrepriseId");

-- AddForeignKey
ALTER TABLE "Utilisateur" ADD CONSTRAINT "Utilisateur_formateurId_fkey" FOREIGN KEY ("formateurId") REFERENCES "Formateur"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Utilisateur" ADD CONSTRAINT "Utilisateur_apprenantId_fkey" FOREIGN KEY ("apprenantId") REFERENCES "Apprenant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Utilisateur" ADD CONSTRAINT "Utilisateur_particulierId_fkey" FOREIGN KEY ("particulierId") REFERENCES "Particulier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Utilisateur" ADD CONSTRAINT "Utilisateur_entrepriseId_fkey" FOREIGN KEY ("entrepriseId") REFERENCES "Entreprise"("id") ON DELETE SET NULL ON UPDATE CASCADE;
