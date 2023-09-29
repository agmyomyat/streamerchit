-- CreateTable
CREATE TABLE "PaymentRegistration" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fb_link" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "PaymentRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaymentRegistration_user_id_key" ON "PaymentRegistration"("user_id");

-- AddForeignKey
ALTER TABLE "PaymentRegistration" ADD CONSTRAINT "PaymentRegistration_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
