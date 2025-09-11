/*
  Warnings:

  - You are about to drop the column `salaryFrom` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `salaryTo` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `workingMethod` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `avatarUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - Added the required column `name` to the `Candidate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Candidate" ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT;

-- AlterTable
ALTER TABLE "public"."Company" ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "phone" TEXT;

-- AlterTable
ALTER TABLE "public"."Job" DROP COLUMN "salaryFrom",
DROP COLUMN "salaryTo",
DROP COLUMN "workingMethod",
ADD COLUMN     "applicationMethod" TEXT,
ADD COLUMN     "salary" TEXT,
ADD COLUMN     "thumbnailUrl" TEXT;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "avatarUrl",
DROP COLUMN "name",
DROP COLUMN "phone";
