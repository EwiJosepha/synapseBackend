import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from "../utils/constant";
import { PrismaModule } from 'src/prisma/prisma.module';
import { MessageController } from './messages.controller';
import { MessageService } from './messages.service';

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
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageAuth {}
