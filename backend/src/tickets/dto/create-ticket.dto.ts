import { IsEnum, IsString } from 'class-validator';
import { TicketStatus } from '../enum/ticket-status.enum';
import { TicketPriority } from '../enum/ticket-priority.enum';

export class CreateTicketDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsEnum(TicketStatus)
  status!: TicketStatus;

  @IsEnum(TicketPriority)
  priority!: TicketPriority;
}