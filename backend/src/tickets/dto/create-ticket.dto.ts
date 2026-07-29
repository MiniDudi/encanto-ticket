import { IsEnum, IsString } from 'class-validator';
import { TicketPriority } from '../enum/ticket-priority.enum';

export class CreateTicketDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsEnum(TicketPriority)
  priority!: TicketPriority;
}