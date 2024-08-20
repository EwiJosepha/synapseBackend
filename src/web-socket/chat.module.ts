import { Module } from '@nestjs/common';
import { ChatGateWay } from './gateway';

@Module({
  providers: [ChatGateWay],
  exports: [ChatGateWay],
})
export class ChatModule {}