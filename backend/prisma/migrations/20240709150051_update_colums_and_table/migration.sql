/*
  Warnings:

  - You are about to alter the column `price` on the `cart_items` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to alter the column `prices` on the `carts` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `discount` on the `carts` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `name` on the `categories` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(125)`.
  - You are about to alter the column `courierCode` on the `couriers` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `courierServiceCode` on the `couriers` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `courierServiceName` on the `couriers` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `price` on the `couriers` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to alter the column `prices` on the `invoices` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `receiverLongitude` on the `invoices` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `receiverLatitude` on the `invoices` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `name` on the `message_templates` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(125)`.
  - You are about to drop the column `shippingRate` on the `orders` table. All the data in the column will be lost.
  - You are about to alter the column `pricePerProduct` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to alter the column `discount` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(2,1)`.
  - You are about to alter the column `receiverLatitude` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `receiverLongitude` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to drop the column `weight` on the `product_variants` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `product_variants` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(125)`.
  - You are about to alter the column `price` on the `product_variants` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to drop the column `size` on the `products` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(125)`.
  - The `attachments` column on the `products` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `locationId` on the `stores` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `stores` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(125)`.
  - You are about to alter the column `slogan` on the `stores` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(125)`.
  - You are about to alter the column `domain` on the `stores` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(125)`.
  - You are about to alter the column `name` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(125)`.
  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `phone` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `password` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profiles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `bank_accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `cart_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `decorations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `message_templates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `operation_hours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Made the column `receiverAddress` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `receiverPostalCode` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `receiverCityDistrict` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `receiverProvince` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `receiverLatitude` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `receiverLongitude` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `amount` on the `payments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updatedAt` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_storeId_fkey";

-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_userId_fkey";

-- DropIndex
DROP INDEX "operation_hours_storeId_key";

-- AlterTable
ALTER TABLE "bank_accounts" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "cart_items" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "carts" ALTER COLUMN "prices" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "discount" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "name" SET DATA TYPE VARCHAR(125);

-- AlterTable
ALTER TABLE "couriers" ALTER COLUMN "courierCode" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "courierServiceCode" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "courierServiceName" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "decorations" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "invoices" ALTER COLUMN "prices" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "receiverLongitude" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "receiverLatitude" SET DATA TYPE VARCHAR(20);

-- AlterTable
ALTER TABLE "message_templates" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(125);

-- AlterTable
ALTER TABLE "operation_hours" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "shippingRate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "pricePerProduct" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "discount" SET DATA TYPE DECIMAL(2,1),
ALTER COLUMN "receiverAddress" SET NOT NULL,
ALTER COLUMN "receiverPostalCode" SET NOT NULL,
ALTER COLUMN "receiverCityDistrict" SET NOT NULL,
ALTER COLUMN "receiverProvince" SET NOT NULL,
ALTER COLUMN "receiverLatitude" SET NOT NULL,
ALTER COLUMN "receiverLatitude" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "receiverLongitude" SET NOT NULL,
ALTER COLUMN "receiverLongitude" SET DATA TYPE VARCHAR(20);

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "amount",
ADD COLUMN     "amount" DECIMAL(10,2) NOT NULL;

-- AlterTable
ALTER TABLE "product_variants" DROP COLUMN "weight",
ADD COLUMN     "weightInGram" INTEGER,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(125),
ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "products" DROP COLUMN "size",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(125),
DROP COLUMN "attachments",
ADD COLUMN     "attachments" TEXT[],
ALTER COLUMN "isActive" SET DEFAULT false;

-- AlterTable
ALTER TABLE "stores" DROP COLUMN "locationId",
ALTER COLUMN "name" SET DATA TYPE VARCHAR(125),
ALTER COLUMN "slogan" SET DATA TYPE VARCHAR(125),
ALTER COLUMN "domain" SET DATA TYPE VARCHAR(125);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "name" SET DATA TYPE VARCHAR(125),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(50);

-- DropTable
DROP TABLE "Location";

-- DropTable
DROP TABLE "profiles";

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "postalCode" VARCHAR(50) NOT NULL,
    "cityDistrict" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "latitude" VARCHAR(20) NOT NULL,
    "longitude" VARCHAR(20) NOT NULL,
    "isMainLocation" BOOLEAN NOT NULL,
    "isStoreAddress" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "storeId" INTEGER,
    "userId" INTEGER,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
