import { Body, Controller, Post } from "@nestjs/common";
import { FileAttachmentService } from "./file-attachment.service";
import { CreateFileAttachmentDto } from "./dto-files/files-dto";

@Controller("file-attachment")
export class FileAttachmentController {
  constructor(private fileAttachMentS: FileAttachmentService) {}

  @Post()
  async fileCreationController (@Body() creationFileDto: CreateFileAttachmentDto){
    return this.fileAttachMentS.createFileAttachment(creationFileDto)
  }

}
