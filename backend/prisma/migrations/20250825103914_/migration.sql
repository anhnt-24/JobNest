/*
  Warnings:

  - The values [intern,junior,senior,lead,other] on the enum `JobLevel` will be removed. If these variants are still used in the database, this will fail.
  - The values [fulltime,parttime,freelance,remote] on the enum `JobType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `address` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `education` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `experience` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `updaetdAt` on the `Job` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."CVType" AS ENUM ('UPLOADED', 'GENERATED');

-- CreateEnum
CREATE TYPE "public"."CVFormat" AS ENUM ('PDF', 'DOCX', 'PNG', 'JPG', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."EducationLevel" AS ENUM ('NONE', 'HIGH_SCHOOL', 'COLLEGE', 'BACHELOR', 'MASTER', 'DOCTORATE');

-- AlterEnum
BEGIN;
CREATE TYPE "public"."JobLevel_new" AS ENUM ('INTERN', 'FRESHER', 'JUNIOR', 'MID', 'SENIOR', 'MANAGER', 'DIRECTOR');
ALTER TABLE "public"."Job" ALTER COLUMN "level" TYPE "public"."JobLevel_new" USING ("level"::text::"public"."JobLevel_new");
ALTER TYPE "public"."JobLevel" RENAME TO "JobLevel_old";
ALTER TYPE "public"."JobLevel_new" RENAME TO "JobLevel";
DROP TYPE "public"."JobLevel_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."JobType_new" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'FREELANCE', 'INTERNSHIP');
ALTER TABLE "public"."Job" ALTER COLUMN "type" TYPE "public"."JobType_new" USING ("type"::text::"public"."JobType_new");
ALTER TYPE "public"."JobType" RENAME TO "JobType_old";
ALTER TYPE "public"."JobType_new" RENAME TO "JobType";
DROP TYPE "public"."JobType_old";
COMMIT;

-- AlterTable
ALTER TABLE "public"."CV" ADD COLUMN     "fileSize" INTEGER,
ADD COLUMN     "format" "public"."CVFormat",
ADD COLUMN     "type" "public"."CVType" NOT NULL DEFAULT 'UPLOADED',
ALTER COLUMN "fileUrl" DROP NOT NULL,
ALTER COLUMN "thumbnailUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Candidate" DROP COLUMN "address",
DROP COLUMN "education",
DROP COLUMN "experience",
DROP COLUMN "skills",
DROP COLUMN "summary";

-- AlterTable
ALTER TABLE "public"."Company" DROP COLUMN "address",
ADD COLUMN     "addressDetail" TEXT,
ADD COLUMN     "district" TEXT,
ADD COLUMN     "employeeCount" INTEGER,
ADD COLUMN     "industry" TEXT,
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "province" TEXT,
ADD COLUMN     "ward" TEXT;

-- AlterTable
ALTER TABLE "public"."Job" DROP COLUMN "location",
DROP COLUMN "updaetdAt",
ADD COLUMN     "areaTags" TEXT,
ADD COLUMN     "categories" TEXT,
ADD COLUMN     "education" "public"."EducationLevel",
ADD COLUMN     "experience" TEXT,
ADD COLUMN     "mustSkills" TEXT,
ADD COLUMN     "niceSkills" TEXT,
ADD COLUMN     "quantity" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "workingAddress" TEXT,
ADD COLUMN     "workingMethod" TEXT,
ADD COLUMN     "workingTime" TEXT;
