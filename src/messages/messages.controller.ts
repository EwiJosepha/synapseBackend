import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { MessageService } from "./messages.service";
import { MessageDto } from "./dto-messages/create-message";

@Controller("messages")
export class MessageController {
  constructor(private messagesServices: MessageService) {}

  @Post()
  createMessage(@Body() messageDto: MessageDto) {

    return this.messagesServices.createMessage(messageDto)

  }

  @Get()
  async handleGetMsges () {
    return this.messagesServices.getSenderAndReceiver()
  }
  @Get('conversation/:conversationId')
  async getMessagesByConversationId(@Param('conversationId') conversationId: string) {
    return this.messagesServices.getMessagesByConversationId(conversationId);
  }
}

20240815130947