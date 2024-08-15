import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MessageAuth } from './messages/messages.module';


@Module({
  imports: [AuthModule, MessageAuth],
  controllers: [],
  providers: [],
})
export class AppModule {}
