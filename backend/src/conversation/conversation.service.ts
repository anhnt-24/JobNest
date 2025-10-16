import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}

  async create(userIds: number[], applicationId?: number) {
    if (!userIds || userIds.length < 2) {
      throw new Error('A conversation requires at least 2 users');
    }

    if (applicationId) {
      const existingByApp = await this.prisma.conversation.findUnique({
        where: { applicationId },
      });
      if (existingByApp) return existingByApp;
    }
    const existing = await this.prisma.conversation.findFirst({
      where: {
        AND: userIds.map((id) => ({
          users: { some: { userId: id } },
        })),
        applicationId: applicationId ? applicationId : null,
      },
      include: { users: true },
    });

    if (existing) return existing;

    const conversation = await this.prisma.conversation.create({
      data: {
        ...(applicationId ? { applicationId } : {}),
        users: {
          create: userIds.map((id) => ({ userId: id })),
        },
      },
      include: {
        users: { include: { user: true } },
      },
    });

    return conversation;
  }

  async getConversations(userId: number) {
    const conversations = await this.prisma.conversation.findMany({
      where: { users: { some: { userId } } },
      include: {
        users: { include: { user: true } },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return conversations.map((c) => ({
      ...c,
      lastMessage: c.messages[0] ?? null,
    }));
  }

  async sendMessage(conversationId: number, senderId: number, content: string) {
    const convo = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!convo) throw new NotFoundException('Conversation not found');

    const message = await this.prisma.message.create({
      data: { conversationId, senderId, content },
      include: { sender: true },
    });

    await this.prisma.conversation.update({
      where: { id: conversationId },
      data: { lastMessage: content },
    });

    return message;
  }

  async getMessages(conversationId: number) {
    return this.prisma.message.findMany({
      where: { conversationId },
      include: { sender: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  async getConversationByApplication(applicationId: number) {
    return this.prisma.conversation.findUnique({
      where: { applicationId },
    });
  }
}
