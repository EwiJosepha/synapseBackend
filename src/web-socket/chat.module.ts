import { forwardRef, Module } from '@nestjs/common';
import { ChatGateWay } from './gateway';
import { MessageModule } from 'src/messages/messages.module';

@Module({
  imports: [forwardRef(() => MessageModule)],
  providers: [ChatGateWay],
  exports: [ChatGateWay],
})
export class ChatModule {}