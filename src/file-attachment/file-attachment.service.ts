import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateFileAttachmentDto } from "./dto-files/files-dto";

@Injectable()
export class FileAttachmentService {
  constructor(private prisma: PrismaService) { }
  async createFileAttachment(createfileAttachementDto: CreateFileAttachmentDto) {
    const { fileName, fileUrl, fileSize, mimeType, messageId } = createfileAttachementDto
    return await this.prisma.fileAttachment.create({
      data: {
        fileName,
        fileSize,
        fileUrl,
        messageId,
        mimeType
      }
    })
  }
}