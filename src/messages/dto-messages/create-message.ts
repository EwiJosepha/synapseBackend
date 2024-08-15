import { IsString, IsUUID, IsBoolean, IsDate, IsOptional, IsEnum, IsArray,  } from 'class-validator';
import { MessageStatus, MessageReaction, FileAttachment } from '@prisma/client';
import { FileAttachmentDto } from 'src/file-attachment/dto-files/files-dto';

export class MessageDto {
  @IsUUID()
  senderId: string;

  @IsUUID()
  receiverId: string;

  @IsString()
  content: string;

  @IsDate()
  @IsOptional()
  timestamp?: Date;

  @IsBoolean()
  @IsOptional()
  isRead?: boolean;

  @IsUUID()
  conversationId: string;

  @IsEnum(MessageStatus)
  @IsOptional()
  status?: MessageStatus;

  @IsArray()
  @IsOptional()
  reactions?: MessageReaction[];

  @IsArray()
  @IsOptional()
  attachments?: FileAttachmentDto[];
}



export class UpdateMessageDto {
  @IsString()
  @IsOptional()
  content?: string;

  @IsBoolean()
  @IsOptional()
  isRead?: boolean;

  @IsEnum(MessageStatus)
  @IsOptional()
  status?: MessageStatus;
}