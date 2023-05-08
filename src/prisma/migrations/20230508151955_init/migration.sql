-- CreateTable
CREATE TABLE "Url" (
    "baseUrl" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deprecationDate" TIMESTAMP(3),

    CONSTRAINT "Url_pkey" PRIMARY KEY ("baseUrl","slug")
);
