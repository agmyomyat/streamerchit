/*
  Warnings:

  - Added the required column `display_name` to the `DonationPage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DonationPage" ADD COLUMN     "display_name" TEXT NOT NULL;
