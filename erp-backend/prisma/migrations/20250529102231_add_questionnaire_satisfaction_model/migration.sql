-- CreateTable
CREATE TABLE "QuestionnaireSatisfaction" (
    "id" TEXT NOT NULL,
    "apprenantId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "satisfactionGlobale" INTEGER NOT NULL,
    "remarques" TEXT,
    "urlDocx" TEXT,
    "urlPdf" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionnaireSatisfaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuestionnaireSatisfaction" ADD CONSTRAINT "QuestionnaireSatisfaction_apprenantId_fkey" FOREIGN KEY ("apprenantId") REFERENCES "Apprenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionnaireSatisfaction" ADD CONSTRAINT "QuestionnaireSatisfaction_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
