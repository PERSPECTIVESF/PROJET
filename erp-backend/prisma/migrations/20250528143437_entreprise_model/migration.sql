-- CreateTable
CREATE TABLE "Apprenant" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "civilite" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "nomUsage" TEXT,
    "prenom" TEXT NOT NULL,
    "dateNaissance" TIMESTAMP(3) NOT NULL,
    "adresse" TEXT NOT NULL,
    "codePostal" TEXT NOT NULL,
    "ville" TEXT NOT NULL,
    "numeroSecu" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fonction" TEXT,
    "lieuActivite" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Apprenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntrepriseApprenant" (
    "id" TEXT NOT NULL,
    "apprenantId" TEXT NOT NULL,
    "entrepriseId" TEXT NOT NULL,

    CONSTRAINT "EntrepriseApprenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entreprise" (
    "id" TEXT NOT NULL,
    "siret" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "ville" TEXT NOT NULL,
    "codePostal" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "secteur" TEXT,
    "codeAPE" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Entreprise_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Apprenant_code_key" ON "Apprenant"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Apprenant_email_key" ON "Apprenant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Entreprise_siret_key" ON "Entreprise"("siret");

-- AddForeignKey
ALTER TABLE "EntrepriseApprenant" ADD CONSTRAINT "EntrepriseApprenant_apprenantId_fkey" FOREIGN KEY ("apprenantId") REFERENCES "Apprenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntrepriseApprenant" ADD CONSTRAINT "EntrepriseApprenant_entrepriseId_fkey" FOREIGN KEY ("entrepriseId") REFERENCES "Entreprise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
