/*
  Warnings:

  - Added the required column `payout_uid` to the `Payout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payout" ADD COLUMN     "payout_uid" TEXT NOT NULL;
