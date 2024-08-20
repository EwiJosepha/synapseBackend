import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from "../utils/constant";
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConversationController } from './coversation.controller';
import { ConversationService } from './conversation.service';
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: '10 days',
      }
    }), PrismaModule
  ],
  controllers: [ConversationController],
  providers: [ConversationService],
})
export class ConversationModule {}
