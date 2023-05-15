import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { mockRegistrarFornecedorUseCaseInput } from '@app/__mocks__';
import { provideRegistrarFornecedorUseCase } from '@app/app.provider';

import {
  mockFornecedorEntity,
  mockMateriaPrimaEntity,
} from '@domain/__mocks__';
import type {
  IFornecedorRepository,
  IMateriaPrimaRepository,
} from '@domain/core';

import {
  FornecedorRepository,
  MateriaPrimaRepository,
} from '@infra/database/prisma';

import type { IRegistrarFornecedorUseCase } from './registrar-fornecedor.use-case';
import { RegistrarFornecedorUseCase } from './registrar-fornecedor.use-case';

describe('RegistrarFornecedorUseCase', () => {
  let registerFornecedorUseCase: IRegistrarFornecedorUseCase;
  let fornecedorRepository: IFornecedorRepository;
  let materiaPrimaRepository: IMateriaPrimaRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        provideRegistrarFornecedorUseCase,
        {
          provide: FornecedorRepository,
          useValue: {
            exists: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: MateriaPrimaRepository,
          useValue: {
            findOneById: jest.fn(),
          },
        },
      ],
    }).compile();

    registerFornecedorUseCase = app.get<IRegistrarFornecedorUseCase>(
      RegistrarFornecedorUseCase,
    );
    fornecedorRepository = app.get<IFornecedorRepository>(FornecedorRepository);
    materiaPrimaRepository = app.get<IMateriaPrimaRepository>(
      MateriaPrimaRepository,
    );
  });

  it('should defined', () => {
    expect(registerFornecedorUseCase).toBeDefined();
    expect(fornecedorRepository).toBeDefined();
    expect(materiaPrimaRepository).toBeDefined();
  });

  it('deve registrar um novo fornecedor', async () => {
    jest
      .spyOn(fornecedorRepository, 'save')
      .mockResolvedValue(mockFornecedorEntity);
    jest
      .spyOn(materiaPrimaRepository, 'findOneById')
      .mockResolvedValue(mockMateriaPrimaEntity);
    const result = await registerFornecedorUseCase.execute(
      mockRegistrarFornecedorUseCaseInput,
    );
    expect(result).toBeDefined();
  });
});
