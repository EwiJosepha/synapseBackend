import { Body, Controller, Post } from "@nestjs/common";
import { ConversationParticipantService } from "./con-participant.service";
import { ConversationParticipantDto } from "./dto-part-conversation/create-conversation";
@Controller("conversationParticipant")
export class ConversationParticipantController {
  constructor(private conversationParticipantService: ConversationParticipantService) { }
  @Post()
  async participantController(@Body() conPartDto: ConversationParticipantDto) {
    return this.conversationParticipantService.createConversationParticipant(conPartDto)
  }
}

