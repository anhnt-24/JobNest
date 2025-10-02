/*
  Warnings:

  - The values [pending,reviewed,accepted,rejected] on the enum `ApplicationStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [male,female,other] on the enum `Gender` will be removed. If these variants are still used in the database, this will fail.
  - The values [candidate,employer,admin,company] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `birthday` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `district` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `industry` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `province` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `ward` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `categories` on the `Job` table. All the data in the column will be lost.
  - The `areaTags` column on the `Job` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `experience` column on the `Job` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `mustSkills` column on the `Job` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `niceSkills` column on the `Job` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Job` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `isRead` on the `Notification` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."ExperienceLevel" AS ENUM ('NONE', 'SIX_MONTH', 'ONE_TWO_YEARS', 'TWO_THREE_YEARS', 'THREE_FIVE_YEARS', 'FIVE_PLUS');

-- AlterEnum
BEGIN;
CREATE TYPE "public"."ApplicationStatus_new" AS ENUM ('PENDING', 'REVIEWED', 'ACCEPTED', 'REJECTED');
ALTER TABLE "public"."Application" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."Application" ALTER COLUMN "status" TYPE "public"."ApplicationStatus_new" USING ("status"::text::"public"."ApplicationStatus_new");
ALTER TYPE "public"."ApplicationStatus" RENAME TO "ApplicationStatus_old";
ALTER TYPE "public"."ApplicationStatus_new" RENAME TO "ApplicationStatus";
DROP TYPE "public"."ApplicationStatus_old";
ALTER TABLE "public"."Application" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."Gender_new" AS ENUM ('MALE', 'FEMALE', 'OTHER');
ALTER TABLE "public"."Candidate" ALTER COLUMN "gender" TYPE "public"."Gender_new" USING ("gender"::text::"public"."Gender_new");
ALTER TABLE "public"."Employer" ALTER COLUMN "gender" TYPE "public"."Gender_new" USING ("gender"::text::"public"."Gender_new");
ALTER TYPE "public"."Gender" RENAME TO "Gender_old";
ALTER TYPE "public"."Gender_new" RENAME TO "Gender";
DROP TYPE "public"."Gender_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."Role_new" AS ENUM ('CANDIDATE', 'EMPLOYER', 'ADMIN', 'COMPANY');
ALTER TABLE "public"."User" ALTER COLUMN "role" TYPE "public"."Role_new" USING ("role"::text::"public"."Role_new");
ALTER TYPE "public"."Role" RENAME TO "Role_old";
ALTER TYPE "public"."Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
COMMIT;

-- AlterTable
ALTER TABLE "public"."Application" ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "public"."CV" ADD COLUMN     "content" JSONB,
ADD COLUMN     "templateId" INTEGER,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."Candidate" DROP COLUMN "birthday",
ADD COLUMN     "dob" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."Company" DROP COLUMN "district",
DROP COLUMN "industry",
DROP COLUMN "province",
DROP COLUMN "ward",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "foundedAt" TIMESTAMP(3),
ADD COLUMN     "industryId" INTEGER,
ADD COLUMN     "taxCode" TEXT;

-- AlterTable
ALTER TABLE "public"."Job" DROP COLUMN "categories",
ADD COLUMN     "categoryId" INTEGER,
DROP COLUMN "areaTags",
ADD COLUMN     "areaTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
DROP COLUMN "experience",
ADD COLUMN     "experience" "public"."ExperienceLevel" NOT NULL DEFAULT 'NONE',
DROP COLUMN "mustSkills",
ADD COLUMN     "mustSkills" TEXT[] DEFAULT ARRAY[]::TEXT[],
DROP COLUMN "niceSkills",
ADD COLUMN     "niceSkills" TEXT[] DEFAULT ARRAY[]::TEXT[],
DROP COLUMN "status",
ADD COLUMN     "status" "public"."JobStatus" NOT NULL DEFAULT 'OPEN';

-- AlterTable
ALTER TABLE "public"."Notification" DROP COLUMN "isRead";

-- CreateTable
CREATE TABLE "public"."Template" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "contentJson" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Industry" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Industry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CandidateFollower" (
    "id" SERIAL NOT NULL,
    "candidateId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CandidateFollower_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CandidateFollower_candidateId_companyId_key" ON "public"."CandidateFollower"("candidateId", "companyId");

-- CreateIndex
CREATE INDEX "CV_candidateId_idx" ON "public"."CV"("candidateId");

-- AddForeignKey
ALTER TABLE "public"."CV" ADD CONSTRAINT "CV_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."Template"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Company" ADD CONSTRAINT "Company_industryId_fkey" FOREIGN KEY ("industryId") REFERENCES "public"."Industry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CandidateFollower" ADD CONSTRAINT "CandidateFollower_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "public"."Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CandidateFollower" ADD CONSTRAINT "CandidateFollower_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Job" ADD CONSTRAINT "Job_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
