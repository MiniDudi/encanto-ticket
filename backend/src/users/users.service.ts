import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) { }

    async create(user: Partial<User>): Promise<User> {
        const newUser = this.usersRepository.create(user);

        return await this.usersRepository.save(newUser);
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.usersRepository.findOne({
            where: { email },
        });
    }

    async findById(id: number): Promise<User | null> {
        return await this.usersRepository.findOne({
            where: { id },
        });
    }

    async delete(id: number): Promise<void> {
        const result = await this.usersRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Usuário com id ${id} não encontrado.`);
        }
    }
}