/*
  Warnings:

  - Added the required column `prebuilt_secret_key` to the `DingerInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DingerInfo" ADD COLUMN     "prebuilt_secret_key" TEXT NOT NULL;
