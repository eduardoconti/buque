/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { mockRegistraProdutoUseCaseInput } from '@app/__mocks__';
import { provideRegistrarProdutoUseCase } from '@app/app.provider';

import { mockMateriaPrimaEntity, mockProdutoEntity } from '@domain/__mocks__';
import type { IMateriaPrimaRepository, IProdutoRepository } from '@domain/core';

import {
  MateriaPrimaMemoryRepository,
  ProdutoMemoryRepository,
} from '@infra/database/memory';

import type { IRegistraProdutoUseCase } from './registrar-produto.use-case';
import { RegistraProdutoUseCase } from './registrar-produto.use-case';

describe('RegistrarProdutouseCase', () => {
  let registrarProdutouseCase: IRegistraProdutoUseCase;
  let produtoRepository: IProdutoRepository;
  let materiaPrimaRepository: IMateriaPrimaRepository;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        provideRegistrarProdutoUseCase,
        {
          provide: ProdutoMemoryRepository,
          useValue: {
            findOneById: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: MateriaPrimaMemoryRepository,
          useValue: {
            findOneById: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    registrarProdutouseCase = app.get<IRegistraProdutoUseCase>(
      RegistraProdutoUseCase,
    );
    produtoRepository = app.get<IProdutoRepository>(ProdutoMemoryRepository);
    materiaPrimaRepository = app.get<IMateriaPrimaRepository>(
      MateriaPrimaMemoryRepository,
    );
  });

  it('should be defined', () => {
    expect(registrarProdutouseCase).toBeDefined();
    expect(produtoRepository).toBeDefined();
    expect(materiaPrimaRepository).toBeDefined();
  });

  it('deve executar com sucesso', async () => {
    jest
      .spyOn(materiaPrimaRepository, 'findOneById')
      .mockResolvedValue(mockMateriaPrimaEntity);

    jest.spyOn(produtoRepository, 'save').mockResolvedValue(mockProdutoEntity);
    const result = await registrarProdutouseCase.execute(
      mockRegistraProdutoUseCaseInput,
    );

    expect(result).toStrictEqual(
      expect.objectContaining({
        id: expect.any(String),
        codigo: mockProdutoEntity.props.codigo,
        nome: mockProdutoEntity.nome.value,
      }),
    );
    expect(materiaPrimaRepository.findOneById).toBeCalledTimes(
      mockRegistraProdutoUseCaseInput.itenMateriaPrima.length,
    );
    expect(produtoRepository.save).toBeCalledTimes(1);
  });

  it('deve lançar um erro quando a materia prima não for encontrada', async () => {
    jest
      .spyOn(materiaPrimaRepository, 'findOneById')
      .mockRejectedValue(new Error('any'));

    jest.spyOn(produtoRepository, 'save').mockResolvedValue(mockProdutoEntity);
    await expect(
      registrarProdutouseCase.execute(mockRegistraProdutoUseCaseInput),
    ).rejects.toThrowError(Error);

    expect(materiaPrimaRepository.findOneById).toBeCalledTimes(1);
    expect(produtoRepository.save).not.toBeCalled();
  });

  it('deve lançar um erro quando alguma materia prima não for encontrada', async () => {
    jest
      .spyOn(materiaPrimaRepository, 'findOneById')
      .mockResolvedValueOnce(mockMateriaPrimaEntity)
      .mockRejectedValueOnce(new Error('any'));

    jest.spyOn(produtoRepository, 'save').mockResolvedValue(mockProdutoEntity);
    await expect(
      registrarProdutouseCase.execute({
        ...mockRegistraProdutoUseCaseInput,
        itenMateriaPrima: [
          ...mockRegistraProdutoUseCaseInput.itenMateriaPrima,
          {
            idMateriaPrima: '29badd61-6990-45e3-acf3-faee6eb4e6ab',
            quantidade: 1,
          },
        ],
      }),
    ).rejects.toThrowError(Error);

    expect(materiaPrimaRepository.findOneById).toBeCalledTimes(2);
    expect(produtoRepository.save).not.toBeCalled();
  });
});
