/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { mockRegistrarCompraUseCaseInput } from '@app/__mocks__';
import { provideRegistrarCompraUseCase } from '@app/app.provider';

import {
  mockFornecedorEntity,
  mockMateriaPrimaEntity,
} from '@domain/__mocks__';
import type { Compra } from '@domain/compra/entities';
import type { IRegistrarCompraUseCase } from '@domain/compra/use-cases';
import type {
  IFornecedorRepository,
  ICompraRepository,
  IMateriaPrimaRepository,
} from '@domain/core';

import {
  FornecedorRepository,
  MateriaPrimaRepository,
} from '@infra/database/prisma';
import { CompraRepository } from '@infra/database/prisma/compra.repository';

import { RegistrarCompraUseCase } from './registrar-compra.use-case';

describe('RegistrarCompraUseCase', () => {
  let registrarCompraUseCase: IRegistrarCompraUseCase;
  let produtoRepository: IMateriaPrimaRepository;
  let clienteRepository: IFornecedorRepository;
  let compraRepository: ICompraRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        provideRegistrarCompraUseCase,
        {
          provide: MateriaPrimaRepository,
          useValue: {
            findOneById: jest.fn(),
          },
        },
        {
          provide: FornecedorRepository,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: CompraRepository,
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    registrarCompraUseCase = app.get<IRegistrarCompraUseCase>(
      RegistrarCompraUseCase,
    );
    produtoRepository = app.get<IMateriaPrimaRepository>(
      MateriaPrimaRepository,
    );
    clienteRepository = app.get<IFornecedorRepository>(FornecedorRepository);
    compraRepository = app.get<ICompraRepository>(CompraRepository);
  });

  it('should be defined', () => {
    expect(registrarCompraUseCase).toBeDefined();
    expect(produtoRepository).toBeDefined();
    expect(clienteRepository).toBeDefined();
    expect(compraRepository).toBeDefined();
  });

  it('deve executar com sucesso', async () => {
    jest
      .spyOn(clienteRepository, 'findOne')
      .mockResolvedValue(mockFornecedorEntity);

    jest
      .spyOn(produtoRepository, 'findOneById')
      .mockResolvedValue(mockMateriaPrimaEntity);

    jest.spyOn(compraRepository, 'save').mockResolvedValue({} as Compra);

    const result = await registrarCompraUseCase.execute(
      mockRegistrarCompraUseCaseInput,
    );
    expect(result).toBeDefined();
  });
});
