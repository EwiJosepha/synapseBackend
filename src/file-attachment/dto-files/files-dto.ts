import { IsUUID, IsString, IsInt, IsDate, IsOptional, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';
import { MessageDto } from 'src/messages/dto-messages/create-message';

export class FileAttachmentDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsUUID()
  messageId: string;

  @IsString()
  fileName: string;

  @IsUrl()
  fileUrl: string;

  @IsInt()
  fileSize: number;

  @IsString()
  mimeType: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  createdAt?: Date;

  @IsOptional()
  message?: MessageDto;
}

export class CreateFileAttachmentDto {
  @IsUUID()
  messageId: string;

  @IsString()
  fileName: string;

  @IsUrl()
  fileUrl: string;

  @IsInt()
  fileSize: number;

  @IsString()
  mimeType: string;
}