/*
  Warnings:

  - You are about to drop the column `cvUrl` on the `Application` table. All the data in the column will be lost.
  - Added the required column `cvId` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Application" DROP COLUMN "cvUrl",
ADD COLUMN     "cvId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Application" ADD CONSTRAINT "Application_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "public"."CV"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
