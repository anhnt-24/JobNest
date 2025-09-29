import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}
  async createConversation(applicationId: number) {
    let convo = await this.prisma.conversation.findFirst({
      where: { applicationId },
      include: { users: true },
    });

    if (convo) return convo;
    const app = await this.prisma.application.findUnique({
      where: { id: applicationId },
      include: { candidate: true, job: { include: { employer: true } } },
    });

    if (!app) throw new Error('Application not found');
    if (!app.candidate || !app.job?.employer) {
      throw new Error('Candidate or Employer not found');
    }
    convo = await this.prisma.conversation.create({
      data: {
        applicationId,
        users: {
          create: [
            { userId: app.candidate.userId },
            { userId: app.job.employer.userId },
          ],
        },
      },
      include: { users: true },
    });

    return convo;
  }
  async getUserConversations(userId: number) {
    return this.prisma.conversation.findMany({
      where: {
        users: {
          some: { userId },
        },
      },
      include: { application: true, users: true, messages: true },
    });
  }

  async getConversationByApplication(appId: number) {
    return this.prisma.conversation.findFirst({
      where: { applicationId: appId },
    });
  }

  async sendMessage(convoId: number, senderId: number, content: string) {
    const convo = await this.prisma.conversation.findUnique({
      where: { id: convoId },
    });

    if (!convo) {
      throw new Error('Conversation not found');
    }

    return this.prisma.message.create({
      data: {
        content,
        senderId,
        conversationId: convoId,
      },
    });
  }

  async getMessages(convoId: number) {
    return this.prisma.message.findMany({
      where: { conversationId: convoId },
      orderBy: { createdAt: 'asc' },
    });
  }
}
