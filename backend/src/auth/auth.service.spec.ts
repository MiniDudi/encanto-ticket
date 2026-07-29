import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;

  const mockUsersService = {
    findByEmail: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('deve cadastrar um novo usuário', async () => {
    mockUsersService.findByEmail.mockResolvedValue(null);

    mockUsersService.create.mockImplementation(async (user) => ({
      id: 1,
      ...user,
    }));

    const dto = {
      name: 'Eduardo',
      email: 'eduardo@email.com',
      password: '123456',
    };

    const result = await service.register(dto);

    expect(mockUsersService.findByEmail).toHaveBeenCalledWith(dto.email);

    expect(mockUsersService.create).toHaveBeenCalled();

    expect(result).toEqual({
      id: 1,
      name: 'Eduardo',
      email: 'eduardo@email.com',
    });
  });

  it('deve realizar login com sucesso', async () => {
    const dto = {
      email: 'eduardo@email.com',
      password: '123456',
    };

    mockUsersService.findByEmail.mockResolvedValue({
      id: 1,
      name: 'Eduardo',
      email: 'eduardo@email.com',
      password: 'senha-hash',
    });

    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

    mockJwtService.signAsync.mockResolvedValue('token-jwt');

    const result = await service.login(dto);

    expect(mockUsersService.findByEmail).toHaveBeenCalledWith(dto.email);

    expect(bcrypt.compare).toHaveBeenCalledWith(
      dto.password,
      'senha-hash',
    );

    expect(mockJwtService.signAsync).toHaveBeenCalledWith({
      sub: 1,
      email: 'eduardo@email.com',
    });

    expect(result).toEqual({
      access_token: 'token-jwt',
    });
  });

  it('deve lançar UnauthorizedException quando o usuário não existir', async () => {
    mockUsersService.findByEmail.mockResolvedValue(null);

    await expect(
      service.login({
        email: 'teste@email.com',
        password: '123456',
      }),
    ).rejects.toThrow('Credenciais inválidas.');
  });

  it('deve lançar UnauthorizedException quando a senha estiver incorreta', async () => {
    mockUsersService.findByEmail.mockResolvedValue({
      id: 1,
      name: 'Eduardo',
      email: 'eduardo@email.com',
      password: 'senha-hash',
    });

    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

    await expect(
      service.login({
        email: 'eduardo@email.com',
        password: 'senhaErrada',
      }),
    ).rejects.toThrow('Credenciais inválidas.');
  });
});