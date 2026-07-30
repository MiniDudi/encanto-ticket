import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class AuthService {

    async login(dto: LoginDto) {
        const user = await this.usersService.findByEmail(dto.email);

        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas.');
        }

        const passwordMatch = await bcrypt.compare(
            dto.password,
            user.password,
        );

        if (!passwordMatch) {
            throw new UnauthorizedException('Credenciais inválidas.');
        }

        const payload = {
            sub: user.id,
            email: user.email,
        };

        return {
            name: user.name,
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async register(dto: RegisterDto) {
        const userExists = await this.usersService.findByEmail(dto.email);

        if (userExists) {
            throw new ConflictException('E-mail já cadastrado.');
        }

        const passwordHash = await bcrypt.hash(dto.password, 10);

        const user = await this.usersService.create({
            name: dto.name,
            email: dto.email,
            password: passwordHash,
        });

        return new UserResponseDto(user);
    }
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }
}