/*
  Warnings:

  - A unique constraint covering the columns `[name,method]` on the table `PaymentProvider` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "PaymentProvider_method_key";

-- DropIndex
DROP INDEX "PaymentProvider_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "PaymentProvider_name_method_key" ON "PaymentProvider"("name", "method");
