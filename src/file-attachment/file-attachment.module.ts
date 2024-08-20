
import { Module } from "@nestjs/common";

import { PrismaModule } from "src/prisma/prisma.module";
import { FileAttachmentController } from "./file-attachment.controller";
import { FileAttachmentService } from "./file-attachment.service";

@Module({
  imports: [PrismaModule],
  controllers:[FileAttachmentController],
  providers:[FileAttachmentService]
})

export class FileAttachmentModule {}
