/*
  Warnings:

  - A unique constraint covering the columns `[userId,conversationId]` on the table `UserConversation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Conversation" ADD COLUMN     "lastMessageAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."UserConversation" ADD COLUMN     "lastReadAt" TIMESTAMP(3),
ADD COLUMN     "unreadCount" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "UserConversation_userId_conversationId_key" ON "public"."UserConversation"("userId", "conversationId");
