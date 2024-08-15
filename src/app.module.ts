import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MessageAuth } from './messages/messages.module';
import { ConversationModule } from './conversation/conversation.module';


@Module({
  imports: [AuthModule, MessageAuth, ConversationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
