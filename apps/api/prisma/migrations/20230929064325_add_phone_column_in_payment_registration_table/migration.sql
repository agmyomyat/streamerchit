/*
  Warnings:

  - Added the required column `phone` to the `PaymentRegistration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PaymentRegistration" ADD COLUMN     "phone" TEXT NOT NULL;
