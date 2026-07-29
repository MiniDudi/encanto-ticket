import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Ticket } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TicketsService {
    async findOne(id: number) {
        return this.ticketsRepository.findOne({
            where: { id },
            relations: ['user'],
        });
    }
    constructor(
        @InjectRepository(Ticket)
        private readonly ticketsRepository: Repository<Ticket>,
    ) { }

    async create(dto: CreateTicketDto, user: User): Promise<Ticket> {
        const ticket = this.ticketsRepository.create({
            ...dto,
            user,
        });

        return this.ticketsRepository.save(ticket);
    }

    async findAll(): Promise<Ticket[]> {
        return this.ticketsRepository.find({
            relations: {
                user: true,
            },
        });
    }

    async findById(id: number): Promise<Ticket> {
        const ticket = await this.ticketsRepository.findOne({
            where: { id },
            relations: {
                user: true,
            },
        });

        if (!ticket) {
            throw new NotFoundException('Ticket não encontrado.');
        }

        return ticket;
    }

    async update(id: number, dto: UpdateTicketDto): Promise<Ticket> {
        const ticket = await this.findById(id);

        Object.assign(ticket, dto);

        return this.ticketsRepository.save(ticket);
    }

    async delete(id: number): Promise<void> {
        const result = await this.ticketsRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException('Ticket não encontrado.');
        }
    }
}