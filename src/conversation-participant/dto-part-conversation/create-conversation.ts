import { IsUUID, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { UserDto } from 'src/auth/dto/create-auth';
import { ConversationDto } from 'src/conversation/dto-conversation/conversation-dto';

export class ConversationParticipantDto {
  @IsUUID()
  conversationId: string;

  @IsUUID()
  userId: string;

  @IsDate()
  @Type(() => Date)
  joinedAt: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  leftAt?: Date;

  @IsOptional()
  user?: UserDto;

  @IsOptional()
  conversation?: ConversationDto;
}