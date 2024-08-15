import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateMessageReactionDto } from "./dto-reaction/reactions-dto";

@Injectable()
export class ReactionService {
  constructor(private prisma: PrismaService) { }

  async reactionCreation(reactionCreation: CreateMessageReactionDto) {
    const { messageId, userId, reaction } = reactionCreation

    const reactioncreated =await this.prisma.messageReaction.create({
      data: {
        messageId,
        userId,
        reaction
      }
    })
    return reactioncreated
  }

}