-- CreateTable
CREATE TABLE "DingerInfo" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "public_key" TEXT NOT NULL,
    "merchant_key" TEXT NOT NULL,
    "project_name" TEXT NOT NULL,
    "merchant_name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "DingerInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DingerInfo_user_id_key" ON "DingerInfo"("user_id");

-- AddForeignKey
ALTER TABLE "DingerInfo" ADD CONSTRAINT "DingerInfo_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
