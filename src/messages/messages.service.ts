import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { MessageDto } from "./dto-messages/create-message";
import { ChatGateWay } from "src/web-socket/gateway";

@Injectable()

export class MessageService {
  constructor(private prisma: PrismaService, private chatGateWay: ChatGateWay) { }


  async createMessage(messageDto: MessageDto) {
    const { content, senderId, receiverId, conversationId, reactions, attachments } = messageDto
    const use1 = await this.prisma.user.findUnique({ where: { id: senderId } })
    const use2 = await this.prisma.user.findUnique({ where: { id: receiverId } })


    console.log({ bothIds: use1 });
    console.log({ bothIs: use2 });


    const conversationIdd = await this.prisma.conversation.findFirst({
      where: {
        OR:
          [{ user1Id: senderId, user2Id: receiverId }, { user1Id: receiverId, user2Id: senderId }]
      }
    })

    const sender = await this.prisma.user.findUnique({
      where: {
        id: senderId,
      },
    });
  
    if (!sender) {
      throw new NotFoundException(`Sender with ID ${senderId} not found`);
    }
  
    // Check if the receiver exists
    const receiver = await this.prisma.user.findUnique({
      where: {
        id: receiverId,
      },
    });
  
    if (!receiver) {
      throw new NotFoundException(`Receiver with ID ${receiverId} not found`);
    }
    const message = await this.prisma.message.create({
      data: {
        content,
        senderId,
        receiverId,
        conversationId
      }
    })

    if (reactions && reactions.length > 0) {
      this.prisma.messageReaction.createMany({
        data: reactions.map(reaction => ({
          messageId: message.id,
          userId: reaction.userId,
          reaction: reaction.reaction,
          id: reaction.id
        })),
      });
    }

    if (attachments && attachments.length > 0) {
      await this.prisma.fileAttachment.createMany({
        data: attachments.map(file => ({
          messageId: file.messageId,
          fileName: file.fileName,
          fileUrl: file.fileUrl,
          fileSize: file.fileSize,
          mimeType: file.mimeType,
          // id: file.id,
        }))
      })
    }

    const messageSent = this.prisma.message.findUnique({
      where: { id: message.id },
      include: {
        reactions: true,
        attachements: true
      }
    })

    this.chatGateWay.server.emit('createdMessage', messageSent)

    return messageSent

  }

  async getSenderAndReceiver() {
    const msges = await this.prisma.message.findMany({
      include: {
        sender: true,
        receiver: true,
      },
    })

    if(!msges)"no conversation yet"

    return msges
  }
}

