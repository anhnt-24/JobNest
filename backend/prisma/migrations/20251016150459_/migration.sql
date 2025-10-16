/*
  Warnings:

  - You are about to drop the column `avatarUrl` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `avatarUrl` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `avatarUrl` on the `Employer` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Employer` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Employer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Candidate" DROP COLUMN "avatarUrl",
DROP COLUMN "name",
DROP COLUMN "phone";

-- AlterTable
ALTER TABLE "public"."Company" DROP COLUMN "avatarUrl",
DROP COLUMN "name",
DROP COLUMN "phone";

-- AlterTable
ALTER TABLE "public"."Employer" DROP COLUMN "avatarUrl",
DROP COLUMN "name",
DROP COLUMN "phone";

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "phone" TEXT;
