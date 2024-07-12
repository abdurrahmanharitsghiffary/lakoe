/*
  Warnings:

  - You are about to drop the column `size` on the `products` table. All the data in the column will be lost.
  - The `attachments` column on the `products` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "size",
DROP COLUMN "attachments",
ADD COLUMN     "attachments" TEXT[];
