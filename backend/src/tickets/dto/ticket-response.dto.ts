export class TicketResponseDto {
  id!: number;
  title!: string;
  description!: string;
  status!: string;
  priority!: string;

  user!: {
    id: number;
    name: string;
  };
}