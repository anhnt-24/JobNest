import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}

  /**
   * Tạo mới hoặc tìm lại cuộc trò chuyện giữa các user
   * (có thể kèm theo applicationId nếu là chat trong ứng tuyển)
   */
  async create(userIds: number[]) {
    if (!userIds || userIds.length < 2) {
      throw new BadRequestException('A conversation requires at least 2 users');
    }
    const existing = await this.prisma.conversation.findFirst({
      where: {
        users: {
          every: {
            userId: { in: userIds },
          },
        },
      },
    });

    if (existing) return existing;

    // Nếu chưa có thì tạo mới
    const conversation = await this.prisma.conversation.create({
      data: {
        users: {
          create: userIds.map((userId) => ({ userId })),
        },
      },
      include: {
        users: { include: { user: true } },
      },
    });

    return conversation;
  }
  async createWithApplication(appId: number) {
    // Kiểm tra conversation đã tồn tại chưa
    const existingConversation = await this.prisma.conversation.findUnique({
      where: { applicationId: appId },
      include: {
        users: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
    });
    if (existingConversation) {
      return existingConversation;
    }

    // Lấy thông tin candidate và employer từ application
    const application = await this.prisma.application.findUnique({
      where: { id: appId },
      include: {
        candidate: { select: { userId: true } },
        job: {
          select: { employer: { select: { user: { select: { id: true } } } } },
        },
      },
    });

    if (!application || !application.job.employer)
      throw new Error('Application not found');

    const conversation = await this.prisma.conversation.create({
      data: {
        applicationId: appId,
        users: {
          create: [
            { userId: application.candidate.userId },
            { userId: application.job.employer.user.id },
          ],
        },
      },
      include: {
        users: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
    });

    return conversation;
  }

  /**
   * Lấy danh sách tất cả cuộc trò chuyện của 1 user
   */
  async getConversations(userId: number) {
    const conversations = await this.prisma.conversation.findMany({
      where: { users: { some: { userId } } },
      include: {
        users: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
      orderBy: {
        lastMessageAt: 'desc', // Ưu tiên theo tin nhắn mới nhất
      },
    });

    return conversations;
  }

  async getConversationById(convoId: number) {
    return this.prisma.conversation.findUnique({
      where: { id: convoId },
      include: {
        users: {
          select: {
            user: {
              select: { id: true, name: true, email: true, avatarUrl: true },
            },
          },
        },
        messages: {
          orderBy: { createdAt: 'asc' },
          select: {
            id: true,
            content: true,
            senderId: true,
            createdAt: true,
          },
        },
      },
    });
  }
  /**
   * Gửi tin nhắn mới trong cuộc trò chuyện
   */
  async sendMessage(conversationId: number, senderId: number, content: string) {
    const convo = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
    });
    if (!convo) throw new NotFoundException('Conversation not found');

    const message = await this.prisma.message.create({
      data: { conversationId, senderId, content },
      include: {
        sender: {
          select: { id: true, name: true, avatarUrl: true },
        },
      },
    });

    // Cập nhật nội dung tin nhắn cuối và thời điểm gửi
    await this.prisma.conversation.update({
      where: { id: conversationId },
      data: {
        lastMessage: content,
        lastMessageAt: new Date(),
      },
    });

    // Cập nhật trạng thái chưa đọc (nếu bạn dùng UserConversation để track)
    await this.prisma.userConversation.updateMany({
      where: {
        conversationId,
        NOT: { userId: senderId },
      },
      data: {
        unreadCount: { increment: 1 },
      },
    });

    return message;
  }

  /**
   * Lấy tất cả tin nhắn trong 1 conversation
   */
  async getMessages(conversationId: number) {
    return this.prisma.message.findMany({
      where: { conversationId },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  /**
   * Tìm conversation theo application (nếu là chat trong hồ sơ ứng tuyển)
   */
  async getConversationByApplication(applicationId: number) {
    const conversation = await this.prisma.conversation.findUnique({
      where: { applicationId },
      include: {
        users: {
          include: {
            user: {
              select: { id: true, name: true, avatarUrl: true },
            },
          },
        },
      },
    });

    if (!conversation) throw new NotFoundException('Conversation not found');
    return conversation;
  }
  async markAsRead(conversationId: number, userId: number) {
    return await this.prisma.userConversation.update({
      where: {
        userId_conversationId: { userId, conversationId },
      },
      data: {
        unreadCount: 0,
        lastReadAt: new Date(),
      },
      include: {
        conversation: {
          select: {
            lastMessage: true,
            lastMessageAt: true,
          },
        },
      },
    });
  }

  async deleteConversation(conversationId: number) {
    await this.prisma.message.deleteMany({
      where: { conversationId },
    });
    await this.prisma.userConversation.deleteMany({
      where: { conversationId },
    });

    await this.prisma.conversation.delete({
      where: { id: conversationId },
    });
    return 'Conversation deleted successfully';
  }
  async getStatus(userId: number, conversationId: number) {
    const status = await this.prisma.userConversation.findUnique({
      where: {
        userId_conversationId: {
          userId,
          conversationId,
        },
      },
      include: {
        conversation: {
          select: {
            lastMessage: true,
            lastMessageAt: true,
          },
        },
      },
    });

    return status;
  }
  async getUnreadConversations(userId: number) {
    const unreadConvos = await this.prisma.userConversation.findMany({
      where: {
        userId,
        unreadCount: {
          gt: 0,
        },
      },
      include: {
        conversation: {
          select: {
            lastMessage: true,
            lastMessageAt: true,
          },
        },
      },
    });
    return unreadConvos;
  }
}
