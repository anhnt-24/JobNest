/*
  Warnings:

  - A unique constraint covering the columns `[lastMessageId]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Conversation" ADD COLUMN     "lastMessageId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_lastMessageId_key" ON "public"."Conversation"("lastMessageId");

-- AddForeignKey
ALTER TABLE "public"."Conversation" ADD CONSTRAINT "Conversation_lastMessageId_fkey" FOREIGN KEY ("lastMessageId") REFERENCES "public"."Message"("id") ON DELETE SET NULL ON UPDATE CASCADE;
