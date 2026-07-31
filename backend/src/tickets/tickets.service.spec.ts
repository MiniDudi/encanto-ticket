import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { TicketsService } from './tickets.service';
import { Ticket } from './entities/ticket.entity';
import { User } from '../users/entities/user.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketPriority } from './enum/ticket-priority.enum';

describe('TicketsService', () => {
  let service: TicketsService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  jest.mock('bcrypt', () => ({
    hash: jest.fn(),
    compare: jest.fn(),
  }));

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketsService,
        {
          provide: getRepositoryToken(Ticket),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TicketsService>(TicketsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deve criar um ticket', async () => {
    const dto: CreateTicketDto = {
      title: 'Erro no login',
      description: 'Usuário não consegue logar',
      priority: TicketPriority.HIGH,
    };

    const user = {
      id: 1,
      name: 'Eduardo',
      email: 'eduardo@email.com',
      password: '123',
    } as User;

    const ticket = {
      id: 1,
      ...dto,
      status: 'aberto',
      user,
    };

    mockRepository.create.mockReturnValue(ticket);
    mockRepository.save.mockResolvedValue(ticket);

    const result = await service.create(dto, user);

    expect(mockRepository.create).toHaveBeenCalledWith({
      ...dto,
      user,
    });

    expect(mockRepository.save).toHaveBeenCalledWith(ticket);
    expect(result).toEqual(ticket);
  });

  it('deve listar todos os tickets', async () => {
    const tickets = [
      {
        id: 1,
        title: 'Teste',
        description: 'Descrição',
        status: 'OPEN',
        priority: 'HIGH',
        user: {
          id: 1,
          name: 'Eduardo',
        },
      },
    ];

    mockRepository.find.mockResolvedValue(tickets);

    const result = await service.findAll();

    expect(mockRepository.find).toHaveBeenCalled();
    expect(result).toEqual(tickets);
  });

  it('deve buscar ticket por id', async () => {
    const ticket = {
      id: 1,
      title: 'Teste',
      description: 'Descrição',
      status: 'OPEN',
      priority: 'HIGH',
      user: {
        id: 1,
        name: 'Eduardo',
      },
    };

    mockRepository.findOne.mockResolvedValue(ticket);

    const result = await service.findById(1);

    expect(mockRepository.findOne).toHaveBeenCalled();
    expect(result).toEqual(ticket);
  });

  it('deve atualizar um ticket', async () => {
    const ticket = {
      id: 1,
      title: 'Antigo',
      description: 'Desc',
      priority: 'baixa',
    };

    const dto = {
      title: 'Novo título',
      priority: 'alta',
    };

    mockRepository.findOne.mockResolvedValue(ticket);

    mockRepository.save.mockResolvedValue({
      ...ticket,
      ...dto,
    });

    const result = await service.update(1, dto);

    expect(mockRepository.findOne).toHaveBeenCalled();

    expect(mockRepository.save).toHaveBeenCalledWith({
      ...ticket,
      ...dto,
    });

    expect(result.title).toBe('Novo título');
    expect(result.priority).toBe('alta');
  });

  it('deve excluir um ticket', async () => {
    mockRepository.delete.mockResolvedValue({
      affected: 1,
    });

    await service.delete(1);

    expect(mockRepository.delete).toHaveBeenCalledWith(1);
  });
});