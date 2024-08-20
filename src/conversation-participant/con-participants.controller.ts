import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ConversationParticipantService } from "./con-participant.service";
import { ConversationParticipantDto } from "./dto-part-conversation/create-conversation";
@Controller("conversationParticipant")
export class ConversationParticipantController {
  constructor(private conversationParticipantService: ConversationParticipantService) { }
  @Post()
  async participantController(@Body() conPartDto: ConversationParticipantDto) {
    return this.conversationParticipantService.createConversationParticipant(conPartDto)
  }
  @Get(":userId/:conversationId")
  async handleParticipants(@Param('userId') userId: string, 
  @Param('conversationId') conversationId: string) {
    return this.conversationParticipantService.getConversationParticipant(userId, conversationId)
  }
}

