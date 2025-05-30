-- CreateTable
CREATE TABLE "Particulier" (
    "id" TEXT NOT NULL,
    "civilite" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "adresse" TEXT,
    "codePostal" TEXT,
    "ville" TEXT,
    "numeroSecu" TEXT,
    "fonction" TEXT,
    "lieuActivite" TEXT,
    "entrepriseId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Particulier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Particulier_email_key" ON "Particulier"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Particulier_numeroSecu_key" ON "Particulier"("numeroSecu");

-- AddForeignKey
ALTER TABLE "Particulier" ADD CONSTRAINT "Particulier_entrepriseId_fkey" FOREIGN KEY ("entrepriseId") REFERENCES "Entreprise"("id") ON DELETE SET NULL ON UPDATE CASCADE;
