import {
  Body,
  Controller,
  Get,
  Param,
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

  @Post('/application/:appId')
  async createConversation(@Param('appId') appId: string) {
    return this.convoService.create(Number(appId));
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
    @Param('convoId') convoId: number | undefined,
    @Body()
    body: { content: string },
  ) {
    const message = await this.convoService.sendMessage(
      Number(convoId),
      +req.user.userId,
      body.content,
    );

    this.chatGateway.server
      .to(`convo_${message.conversationId}`)
      .emit('new_message', message);

    return message;
  }
}
