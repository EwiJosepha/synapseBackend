
import { Body, Controller, Post } from "@nestjs/common";
import { ReactionService } from "./mes-reaction.service";
import { CreateMessageReactionDto } from "./dto-reaction/reactions-dto";

@Controller("reaction")
export class ReactionController {
  constructor(private reactionService: ReactionService) { }

  @Post()
  async reactionController(@Body() reactionDto: CreateMessageReactionDto) {
    return await this.reactionService.reactionCreation(reactionDto)
  }
}