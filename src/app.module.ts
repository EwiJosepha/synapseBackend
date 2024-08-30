import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import {  MessageModule } from './messages/messages.module';
import { ConversationModule } from './conversation/conversation.module';
import { ConversationParticipantModule } from './conversation-participant/con-participant.module';
import { ReactionModule } from './message-reaction/mes-reaction.module';
import { FileAttachmentModule } from './file-attachment/file-attachment.module';
import { ChatModule } from './web-socket/chat.module';


@Module({
  imports: [AuthModule, MessageModule, ConversationModule, ConversationParticipantModule, ReactionModule, FileAttachmentModule, ChatModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
