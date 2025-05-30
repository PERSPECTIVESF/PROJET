-- CreateTable
CREATE TABLE "SessionApprenant" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "apprenantId" TEXT NOT NULL,
    "inscritLe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SessionApprenant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SessionApprenant_sessionId_apprenantId_key" ON "SessionApprenant"("sessionId", "apprenantId");

-- AddForeignKey
ALTER TABLE "SessionApprenant" ADD CONSTRAINT "SessionApprenant_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionApprenant" ADD CONSTRAINT "SessionApprenant_apprenantId_fkey" FOREIGN KEY ("apprenantId") REFERENCES "Apprenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
