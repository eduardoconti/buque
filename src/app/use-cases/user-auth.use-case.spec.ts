import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { mockUserAuthUseCaseInput } from '@app/__mocks__';
import { provideUserAuthUseCase } from '@app/app.provider';

import { mockUserEntity } from '@domain/__mocks__';
import type { IUserRepository } from '@domain/core';

import { UserRepository } from '@infra/database/prisma';
import { UnauthorizedException } from '@infra/exceptions';

import type { IUserAuthUseCase } from './user-auth.use-case';
import { UserAuthUseCase } from './user-auth.use-case';

describe('userAuthUseCase', () => {
  let userAuthUseCase: IUserAuthUseCase;
  let userRepository: IUserRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        provideUserAuthUseCase,
        {
          provide: UserRepository,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    userAuthUseCase = app.get<IUserAuthUseCase>(UserAuthUseCase);
    userRepository = app.get<IUserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(userAuthUseCase).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should execute successfully', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUserEntity);
    const result = await userAuthUseCase.execute(mockUserAuthUseCaseInput);
    expect(result).toBeDefined();
  });

  it('should throw UnauthorizedException when senha compare hash failed', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUserEntity);
    await expect(
      userAuthUseCase.execute({
        ...mockUserAuthUseCaseInput,
        senha: 'teste!123',
      }),
    ).rejects.toThrowError(UnauthorizedException);
  });
});
