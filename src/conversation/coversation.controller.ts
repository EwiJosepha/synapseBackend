import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post, Query } from "@nestjs/common";
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
  
  @Get()
async getConversationByUsers(
  @Query('user1Id') user1Id: string,
  @Query('user2Id') user2Id: string
) {
  if (!user1Id || !user2Id) {
    throw new BadRequestException('Both user1Id and user2Id are required');
  }
  
  const conversation = await this.conversationService.getConversationByUsers(user1Id, user2Id);
  
  if (!conversation) {
    throw new NotFoundException('Conversation not found');
  }
  
  return conversation;
}


}