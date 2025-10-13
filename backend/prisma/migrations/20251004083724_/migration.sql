/*
  Warnings:

  - You are about to drop the column `industryId` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `Job` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Company" DROP CONSTRAINT "Company_industryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Job" DROP CONSTRAINT "Job_categoryId_fkey";

-- AlterTable
ALTER TABLE "public"."Company" DROP COLUMN "industryId",
ADD COLUMN     "industry" TEXT;

-- AlterTable
ALTER TABLE "public"."Job" DROP COLUMN "categoryId",
ADD COLUMN     "category" TEXT;
