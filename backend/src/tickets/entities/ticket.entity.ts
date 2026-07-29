import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TicketStatus } from '../enum/ticket-status.enum';
import { TicketPriority } from '../enum/ticket-priority.enum';
import { User } from '../../users/entities/user.entity';

@Entity('tickets')
export class Ticket {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column({
        type: 'enum',
        enum: TicketStatus,
        default: TicketStatus.OPEN,
    })
    status!: TicketStatus;

    @Column({
        type: 'enum',
        enum: TicketPriority,
        default: TicketPriority.MEDIUM,
    })
    priority!: TicketPriority;

    @ManyToOne(() => User, (user) => user.tickets, {
        onDelete: 'CASCADE',
    })
    user!: User;
}