import { Body, Controller, Post } from "@nestjs/common";
import { ConversationService } from "./conversation.service";
import { CreateConversationDto } from "./dto-conversation/conversation-dto";

@Controller("conversation")
export class ConversationController {
  constructor(private conversationService: ConversationService) { }

@Post()
  async conversationController(@Body() createConversationDto: CreateConversationDto) {
    return this.conversationService.createConversation(createConversationDto)
  }

}