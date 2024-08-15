import { IsUUID, IsString, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { MessageDto } from 'src/messages/dto-messages/create-message';
import { UserDto } from 'src/auth/dto/create-auth';

export class MessageReactionDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsUUID()
  messageId: string;

  @IsUUID()
  userId: string;

  @IsString()
  reaction: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  createdAt?: Date;

  @IsOptional()
  message?: MessageDto;

  @IsOptional()
  user?: UserDto;
}

export class CreateMessageReactionDto {
  @IsUUID()
  messageId: string;

  @IsUUID()
  userId: string;

  @IsString()
  reaction: string;
}

export class UpdateMessageReactionDto {
  @IsString()
  @IsOptional()
  reaction?: string;
}