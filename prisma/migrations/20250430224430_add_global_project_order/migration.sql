-- CreateTable
CREATE TABLE "GlobalSetting" (
    "id" TEXT NOT NULL DEFAULT 'project_order',
    "valueJson" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GlobalSetting_pkey" PRIMARY KEY ("id")
);
