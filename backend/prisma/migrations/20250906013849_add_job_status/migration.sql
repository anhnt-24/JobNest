-- CreateEnum
CREATE TYPE "public"."JobStatus" AS ENUM ('OPEN', 'CLOSED', 'PAUSED');

-- AlterTable
ALTER TABLE "public"."Job" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'OPEN';
