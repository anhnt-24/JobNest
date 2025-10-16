/*
  Warnings:

  - You are about to drop the column `lastMessageId` on the `Conversation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Conversation" DROP CONSTRAINT "Conversation_lastMessageId_fkey";

-- DropIndex
DROP INDEX "public"."Conversation_lastMessageId_key";

-- AlterTable
ALTER TABLE "public"."Conversation" DROP COLUMN "lastMessageId",
ADD COLUMN     "lastMessage" TEXT;
