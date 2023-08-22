/*
  Warnings:

  - Added the required column `callback_key` to the `DingerInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DingerInfo" ADD COLUMN     "callback_key" TEXT NOT NULL;
