import { Module } from "@nestjs/common";
import { ReactionService } from "./mes-reaction.service";
import { ReactionController } from "./mes-reaction.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { JWT_SECRET } from "src/utils/constant";


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
  controllers: [ReactionController],
  providers: [ReactionService]
})

export class ReactionModule {}