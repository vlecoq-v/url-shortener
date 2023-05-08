-- CreateTable
CREATE TABLE "Url" (
    "id" SERIAL NOT NULL,
    "baseUrl" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deprecationDate" TIMESTAMP(3),

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_slug_key" ON "Url"("slug");
