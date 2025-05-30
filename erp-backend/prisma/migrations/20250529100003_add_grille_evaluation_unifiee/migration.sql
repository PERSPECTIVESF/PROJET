-- CreateTable
CREATE TABLE "GrilleEvaluation" (
    "id" TEXT NOT NULL,
    "typeCible" TEXT NOT NULL,
    "cibleId" TEXT NOT NULL,
    "sessionId" TEXT,
    "titre" TEXT NOT NULL,
    "note" INTEGER NOT NULL,
    "commentaire" TEXT,
    "dateEvaluation" TIMESTAMP(3) NOT NULL,
    "urlDocx" TEXT,
    "urlPdf" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GrilleEvaluation_pkey" PRIMARY KEY ("id")
);
