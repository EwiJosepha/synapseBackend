import { Body, Controller, Get, Post } from "@nestjs/common";
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
}

20240815130947