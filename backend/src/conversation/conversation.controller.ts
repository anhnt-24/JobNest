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

@Controller('conversation')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ConversationController {
  constructor(
    private convoService: ConversationService,
    private chatGateway: ChatGateway,
  ) {}

  @Post('')
  async createConversation(@Body() body: { userIds: number[] }) {
    return this.convoService.create(body.userIds);
  }
  @Post('create/:appId')
  async createWithApplication(@Param('appId', ParseIntPipe) appId: number) {
    return await this.convoService.createWithApplication(appId);
  }

  @Get('/me')
  async getUserConversations(@Req() req) {
    return this.convoService.getConversations(Number(req.user.userId));
  }

  @Get('/application/:appId')
  async getConversationByApplication(@Param('appId') appId: number) {
    return this.convoService.getConversationByApplication(Number(appId));
  }

  @Get('/:convoId/messages')
  async getMessages(@Param('convoId') convoId: number) {
    return this.convoService.getMessages(Number(convoId));
  }

  @Post('/:convoId/messages')
  async sendMessage(
    @Req() req,
    @Param('convoId', ParseIntPipe) convoId: number,
    @Body() body: { content: string },
  ) {
    const message = await this.convoService.sendMessage(
      convoId,
      +req.user.userId,
      body.content,
    );
    const conversation = await this.convoService.getConversationById(convoId);

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

  @Patch('readed/:convoId')
  async markAsRead(
    @Req() req,
    @Param('convoId', ParseIntPipe) convoId: number,
  ) {
    return this.convoService.markAsRead(convoId, Number(req.user.userId));
  }
  @Delete('/delete/:id')
  async deleteConversation(@Param('id', ParseIntPipe) id: number) {
    return this.convoService.deleteConversation(id);
  }
  @Get('/status/:conversationId')
  async getStatus(@Param('conversationId') conversationId: string, @Req() req) {
    const userId = req.user.userId;
    const status = await this.convoService.getStatus(
      +userId,
      Number(conversationId),
    );
    return status;
  }
  @Get('unread')
  async getUnreadConversations(@Req() req) {
    const userId = req.user.userId;
    const unreadConvos =
      await this.convoService.getUnreadConversations(+userId);
    return unreadConvos;
  }
}
