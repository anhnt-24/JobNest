import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ChatGateway } from './chat.gateway';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('conversations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ConversationController {
  constructor(
    private conversationService: ConversationService,
    private chatGateway: ChatGateway,
  ) {}

  @Post('')
  async createConversation(@Body() body: { userIds: number[] }) {
    return this.conversationService.create(body.userIds);
  }
  @Post(':appId')
  async createWithApplication(@Param('appId', ParseIntPipe) appId: number) {
    return await this.conversationService.createWithApplication(appId);
  }

  @Get('/me')
  async getUserConversations(@Req() req) {
    return this.conversationService.getConversations(Number(req.user.userId));
  }

  @Get('/application/:appId')
  async getConversationByApplication(@Param('appId') appId: number) {
    return this.conversationService.getConversationByApplication(Number(appId));
  }

  @Get('/:convoId/messages')
  async getMessages(@Param('convoId') convoId: number) {
    return this.conversationService.getMessages(Number(convoId));
  }

  @Post('/:convoId/messages')
  async sendMessage(
    @Req() req,
    @Param('convoId', ParseIntPipe) convoId: number,
    @Body() body: { content: string },
  ) {
    const message = await this.conversationService.sendMessage(
      convoId,
      +req.user.userId,
      body.content,
    );
    const conversation =
      await this.conversationService.getConversationById(convoId);

    const participants = conversation!.users.map((u) => u.user.id);
    participants.forEach((userId) => {
      this.chatGateway.server.to(`user_${userId}`).emit('notification', {
        conversationId: message.conversationId,
        senderId: message.senderId,
        content: message.content,
        createdAt: message.createdAt,
      });
    });

    this.chatGateway.server.to(`convo_${convoId}`).emit('message', message);

    return message;
  }

  @Patch(':conversationId')
  async markAsRead(
    @Req() req,
    @Param('conversationId', ParseIntPipe) conversationId: number,
  ) {
    return this.conversationService.markAsRead(
      conversationId,
      Number(req.user.userId),
    );
  }
  @Delete('/:id')
  async deleteConversation(@Param('id', ParseIntPipe) id: number) {
    return this.conversationService.deleteConversation(id);
  }
  @Get('/:conversationId/status')
  async getStatus(@Param('conversationId') conversationId: string, @Req() req) {
    const userId = req.user.userId;
    const status = await this.conversationService.getStatus(
      +userId,
      Number(conversationId),
    );
    return status;
  }
  @Get('unread')
  async getUnreadConversations(@Req() req) {
    const userId = req.user.userId;
    const unreadConvos =
      await this.conversationService.getUnreadConversations(+userId);
    return unreadConvos;
  }
}
