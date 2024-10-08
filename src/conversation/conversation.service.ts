import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateConversationDto } from './dto-conversation/conversation-dto';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) { }

  async createConversation(createConversationDto: CreateConversationDto) {
    const { user1Id, user2Id } = createConversationDto;

    if (!user1Id || !user2Id) {
      throw new Error('Both user1Id and user2Id are required');
    }

    // Check if a conversation already exists between these users
    const existingConversation = await this.prisma.conversation.findFirst({
      where: {
        OR: [
          { user1Id: user1Id, user2Id: user2Id },
          { user1Id: user2Id, user2Id: user1Id }
        ]
      }, include: {
        messages: true,
      }
    });

    if (existingConversation) {
      return existingConversation;
    }

    // Create a new conversation
    const newConversation = await this.prisma.conversation.create({
      data: {
        user1Id,
        user2Id,
        participants: {
          create: [
            { userId: user1Id },
            { userId: user2Id }
          ]
        }
      },
      include: {
        participants: true,
        messages: true,

      },
    });

    console.log(newConversation, "newcon");
    return { newConversation: newConversation.id }
  }

  async getConversations() {
    const conversations = await this.prisma.conversation.findMany({
      include:{
      messages: true
      }
    })
    
    return conversations

  }

  async getAConversation(id: string) {
    const user = await this.prisma.conversation.findUnique({ where: { id: id } })
    console.log({ user });

    return user
  }
}