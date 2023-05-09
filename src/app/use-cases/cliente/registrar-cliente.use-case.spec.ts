import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { mockRegistrarClienteUseCaseInput } from '@app/__mocks__';
import { provideRegistrarClienteUseCase } from '@app/app.provider';

import { mockClienteEntity } from '@domain/__mocks__';
import type { IClienteRepository } from '@domain/core';

import { ClienteRepository } from '@infra/database/prisma';
import { ClienteAlreadyExistsException } from '@infra/exceptions';

import type { IRegistrarClienteUseCase } from './registrar-cliente.use-case';
import { RegistrarClienteUseCase } from './registrar-cliente.use-case';

describe('RegistrarClienteUseCase', () => {
  let registerClienteUseCase: IRegistrarClienteUseCase;
  let userRepository: IClienteRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        provideRegistrarClienteUseCase,
        {
          provide: ClienteRepository,
          useValue: {
            exists: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    registerClienteUseCase = app.get<IRegistrarClienteUseCase>(
      RegistrarClienteUseCase,
    );
    userRepository = app.get<IClienteRepository>(ClienteRepository);
  });

  it('should defined', () => {
    expect(registerClienteUseCase).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('deve registrar um novo cliente', async () => {
    jest.spyOn(userRepository, 'exists').mockResolvedValue(false);
    jest.spyOn(userRepository, 'save').mockResolvedValue(mockClienteEntity);
    const result = await registerClienteUseCase.execute(
      mockRegistrarClienteUseCaseInput,
    );
    expect(result).toBeDefined();
  });
  it('deve lançar erro ClienteAlreadyExistsException quando ja existir um cliente com mesmo email', async () => {
    jest.spyOn(userRepository, 'exists').mockResolvedValue(true);
    await expect(
      registerClienteUseCase.execute(mockRegistrarClienteUseCaseInput),
    ).rejects.toThrowError(ClienteAlreadyExistsException);
    expect(userRepository.exists).toBeCalled();
    expect(userRepository.save).not.toBeCalled();
  });
});
