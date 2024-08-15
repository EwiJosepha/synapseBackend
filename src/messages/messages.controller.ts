import { Body, Controller, Post } from "@nestjs/common";
import { MessageService } from "./messages.service";
import { MessageDto } from "./dto-messages/create-message";

@Controller("messages")
export class MessageController {
  constructor(private messagesServices: MessageService) {}

  @Post("cur")
  createMessage(@Body() messageDto: MessageDto) {

    return this.messagesServices.createMessage(messageDto)

  }
}

20240815130947