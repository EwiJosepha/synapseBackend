import {  IsUUID, IsDate, IsOptional, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { UserDto } from 'src/auth/dto/create-auth';
import { MessageDto } from 'src/messages/dto-messages/create-message';
import { ConversationParticipantDto } from 'src/conversation-participant/dto-part-conversation/create-conversation';


export class ConversationDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsUUID()
  user1Id: string;

  @IsUUID()
  user2Id: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  updatedAt?: Date;

  @IsOptional()
  user1?: UserDto;

  @IsOptional()
  user2?: UserDto;

  @IsArray()
  @IsOptional()
  @Type(() => MessageDto)
  messages?: MessageDto[];

  @IsArray()
  @IsOptional()
  @Type(() => ConversationParticipantDto)
  participants?:ConversationParticipantDto[];
}

export class CreateConversationDto {
  @IsUUID()
  user1Id: string;

  @IsUUID()
  user2Id: string;
}