import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateConversationParticipant } from "./dto-part-conversation/create-conversation";

@Injectable()
export class ConversationParticipantService {
  constructor(private prisma: PrismaService) { }
  async createConversationParticipant(createConversationDto: CreateConversationParticipant) {
    const { userId, conversationId, joinedAt } = createConversationDto;
  
    const existingParticipant = await this.prisma.conversationParticipant.findUnique({
      where: {
        conversationId_userId: {
          conversationId: conversationId,
          userId: userId,
        },
      },
    });
  
    if (existingParticipant) {
      throw new Error('Participant already exists in this conversation.');
    }
  
    const newParticipant = await this.prisma.conversationParticipant.create({
      data: {
        userId: userId,
        conversationId: conversationId,
        jointAt: joinedAt || new Date(),
      },
    });
  
    return newParticipant;
  }
}