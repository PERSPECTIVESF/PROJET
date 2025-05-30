-- CreateTable
CREATE TABLE "Formation" (
    "id" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "dureeHeures" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Formation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "dateDebut" TIMESTAMP(3) NOT NULL,
    "dateFin" TIMESTAMP(3) NOT NULL,
    "lieu" TEXT NOT NULL,
    "formateur" TEXT NOT NULL,
    "formationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Formation_code_key" ON "Formation"("code");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_formationId_fkey" FOREIGN KEY ("formationId") REFERENCES "Formation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
