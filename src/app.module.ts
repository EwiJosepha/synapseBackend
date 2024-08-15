import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MessageAuth } from './messages/messages.module';
import { ConversationModule } from './conversation/conversation.module';
import { ConversationParticipantModule } from './conversation-participant/con-participant.module';
import { ReactionModule } from './message-reaction/mes-reaction.module';


@Module({
  imports: [AuthModule, MessageAuth, ConversationModule, ConversationParticipantModule, ReactionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
