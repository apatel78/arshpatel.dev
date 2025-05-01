/*
  Warnings:

  - You are about to drop the `GlobalSetting` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "GlobalSetting";

-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectRanking" (
    "projectId" INTEGER NOT NULL,
    "totalVotes" INTEGER NOT NULL DEFAULT 0,
    "totalRankSum" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectRanking_pkey" PRIMARY KEY ("projectId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectRanking_projectId_key" ON "ProjectRanking"("projectId");

-- AddForeignKey
ALTER TABLE "ProjectRanking" ADD CONSTRAINT "ProjectRanking_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
