import { Module } from "@nestjs/common";
import { ConversationParticipantController } from "./con-participants.controller";
import { ConversationParticipantService } from "./con-participant.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers:[ConversationParticipantController],
  providers:[ConversationParticipantService]
})

export class ConversationParticipantModule {}
