import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ConversationService } from "./conversation.service";
import { CreateConversationDto } from "./dto-conversation/conversation-dto";

@Controller("conversation")
export class ConversationController {
  constructor(private conversationService: ConversationService) { }

@Post()
  async conversationController(@Body() createConversationDto: CreateConversationDto) {
    return this.conversationService.createConversation(createConversationDto)
  }

  @Get()
  async handleRetrieveConversations () {
    return this.conversationService.getConversations()
  }

  @Get(":id")
  async handleRetrieveAConversation (@Param("id") id: string) {
    return this.conversationService.getAConversation(id)
  }

}