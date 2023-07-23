/*
  Warnings:

  - You are about to drop the column `total_size_in_byte` on the `FileLibrary` table. All the data in the column will be lost.
  - Added the required column `total_size_in_gb` to the `FileLibrary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FileLibrary" DROP COLUMN "total_size_in_byte",
ADD COLUMN     "total_size_in_gb" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Upload" ALTER COLUMN "size_in_byte" SET DATA TYPE TEXT;
