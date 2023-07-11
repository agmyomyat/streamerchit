-- CreateEnum
CREATE TYPE "PayoutStatus" AS ENUM ('PENDING', 'SUCCESS');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Balance" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "active_total" INTEGER NOT NULL DEFAULT 0,
    "real_total" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Balance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentTransaction" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),
    "payment_provider" TEXT NOT NULL,
    "method_name" TEXT NOT NULL,
    "transaction_id" TEXT NOT NULL,
    "doner_name" VARCHAR(255) NOT NULL,
    "memo" TEXT NOT NULL,
    "total_amount" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "PaymentTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donation" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payment_transaction_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentProvider" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "fee_percentage" TEXT NOT NULL,
    "fix_amount" TEXT,
    "redirect_url" TEXT,

    CONSTRAINT "PaymentProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DonationSetting" (
    "id" TEXT NOT NULL,
    "image_href" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "font_weight" INTEGER NOT NULL,
    "font_size" TEXT NOT NULL,
    "font_color" TEXT NOT NULL,
    "message_font_size" TEXT NOT NULL,
    "message_font_color" TEXT NOT NULL,
    "message_font_weight" INTEGER NOT NULL,
    "sound_href" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "DonationSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payout" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT NOT NULL,
    "status" "PayoutStatus" NOT NULL,
    "bank_username" TEXT NOT NULL,
    "bank_type" TEXT NOT NULL,
    "bank_account_number" TEXT NOT NULL,
    "authorized_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Payout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayoutInfo" (
    "id" TEXT NOT NULL,
    "bank_username" TEXT NOT NULL,
    "bank_type" TEXT NOT NULL,
    "bank_account_number" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "PayoutInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Balance_user_id_key" ON "Balance"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Donation_payment_transaction_id_key" ON "Donation"("payment_transaction_id");

-- CreateIndex
CREATE UNIQUE INDEX "Donation_user_id_key" ON "Donation"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentProvider_name_key" ON "PaymentProvider"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentProvider_method_key" ON "PaymentProvider"("method");

-- CreateIndex
CREATE UNIQUE INDEX "DonationSetting_user_id_key" ON "DonationSetting"("user_id");

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentTransaction" ADD CONSTRAINT "PaymentTransaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_payment_transaction_id_fkey" FOREIGN KEY ("payment_transaction_id") REFERENCES "PaymentTransaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationSetting" ADD CONSTRAINT "DonationSetting_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payout" ADD CONSTRAINT "Payout_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayoutInfo" ADD CONSTRAINT "PayoutInfo_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
