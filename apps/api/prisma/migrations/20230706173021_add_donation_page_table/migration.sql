-- CreateTable
CREATE TABLE "DonationPage" (
    "id" TEXT NOT NULL,
    "page_cover" TEXT,
    "url_handle" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "DonationPage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DonationPage_url_handle_key" ON "DonationPage"("url_handle");

-- CreateIndex
CREATE UNIQUE INDEX "DonationPage_user_id_key" ON "DonationPage"("user_id");

-- AddForeignKey
ALTER TABLE "DonationPage" ADD CONSTRAINT "DonationPage_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
