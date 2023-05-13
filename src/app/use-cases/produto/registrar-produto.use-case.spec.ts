/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { mockRegistraProdutoUseCaseInput } from '@app/__mocks__';
import { provideRegistrarProdutoUseCase } from '@app/app.provider';
import { ProdutoAlreadyExistsException } from '@app/exceptions';

import { mockMateriaPrimaEntity, mockProdutoEntity } from '@domain/__mocks__';
import type { IMateriaPrimaRepository, IProdutoRepository } from '@domain/core';
import { UUID } from '@domain/value-objects';

import {
  MateriaPrimaRepository,
  ProdutoRepository,
} from '@infra/database/prisma';

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
          provide: ProdutoRepository,
          useValue: {
            findOneById: jest.fn(),
            save: jest.fn(),
            exists: jest.fn(),
          },
        },
        {
          provide: MateriaPrimaRepository,
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
    produtoRepository = app.get<IProdutoRepository>(ProdutoRepository);
    materiaPrimaRepository = app.get<IMateriaPrimaRepository>(
      MateriaPrimaRepository,
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
    jest.spyOn(produtoRepository, 'exists').mockResolvedValue(false);
    const result = await registrarProdutouseCase.execute(
      mockRegistraProdutoUseCaseInput,
    );

    expect(result).toStrictEqual({
      id: expect.any(String),
      descricao: mockProdutoEntity.props.descricao,
      itemMateriaPrima: mockRegistraProdutoUseCaseInput.itemMateriaPrima.map(
        (e) => {
          return {
            id: mockMateriaPrimaEntity.id.value,
            nome: 'fake nome',
            quantidade: e.quantidade,
          };
        },
      ),
      precoCusto: 1000,
      nome: mockProdutoEntity.nome.value,
      valor: mockProdutoEntity.valor.value,
    });
    expect(materiaPrimaRepository.findOneById).toBeCalledTimes(
      mockRegistraProdutoUseCaseInput.itemMateriaPrima.length,
    );
    expect(produtoRepository.save).toBeCalledTimes(1);
    expect(produtoRepository.save).toBeCalledWith(
      expect.objectContaining({
        _dataInclusao: { props: { value: expect.any(Date) } },
        _id: expect.any(UUID),
        _updatedAt: { props: { value: expect.any(Date) } },
        props: {
          descricao: 'fake descricao',
          nome: { props: { value: 'fake nome' } },
          precoCusto: { props: { value: 1000 } },
          produtoMateriaPrima: [
            {
              _dataInclusao: { props: { value: expect.any(Date) } },
              _id: expect.any(UUID),
              _updatedAt: { props: { value: expect.any(Date) } },
              props: {
                idProduto: expect.any(UUID),
                materiaPrima: {
                  _dataInclusao: {
                    props: { value: expect.any(Date) },
                  },
                  _id: expect.any(UUID),
                  _updatedAt: { props: { value: expect.any(Date) } },
                  props: {
                    descricao: 'fake descricao',
                    nome: { props: { value: 'fake nome' } },
                    valorUnitario: { props: { value: 1000 } },
                  },
                },
                quantidade: 1,
              },
            },
          ],
          valor: { props: { value: 1000 } },
        },
      }),
    );
  });

  it('deve lançar um erro quando já existe produto com mesmo nome', async () => {
    jest.spyOn(produtoRepository, 'exists').mockResolvedValue(true);

    await expect(
      registrarProdutouseCase.execute(mockRegistraProdutoUseCaseInput),
    ).rejects.toThrowError(ProdutoAlreadyExistsException);

    expect(materiaPrimaRepository.findOneById).not.toBeCalled();
    expect(produtoRepository.save).not.toBeCalled();
  });

  it('deve lançar um erro quando a materia prima não for encontrada', async () => {
    jest.spyOn(produtoRepository, 'exists').mockResolvedValue(false);
    jest
      .spyOn(materiaPrimaRepository, 'findOneById')
      .mockRejectedValue(new Error('any'));

    jest.spyOn(produtoRepository, 'save').mockResolvedValue(mockProdutoEntity);
    await expect(
      registrarProdutouseCase.execute(mockRegistraProdutoUseCaseInput),
    ).rejects.toThrowError(Error);

    expect(materiaPrimaRepository.findOneById).toBeCalledTimes(1);
    expect(produtoRepository.exists).toBeCalled();
    expect(produtoRepository.save).not.toBeCalled();
  });

  it('deve lançar um erro quando alguma materia prima não for encontrada', async () => {
    jest.spyOn(produtoRepository, 'exists').mockResolvedValue(false);
    jest
      .spyOn(materiaPrimaRepository, 'findOneById')
      .mockResolvedValueOnce(mockMateriaPrimaEntity)
      .mockRejectedValueOnce(new Error('any'));

    jest.spyOn(produtoRepository, 'save').mockResolvedValue(mockProdutoEntity);
    await expect(
      registrarProdutouseCase.execute({
        ...mockRegistraProdutoUseCaseInput,
        itemMateriaPrima: [
          ...mockRegistraProdutoUseCaseInput.itemMateriaPrima,
          {
            idMateriaPrima: '29badd61-6990-45e3-acf3-faee6eb4e6ab',
            quantidade: 1,
          },
        ],
      }),
    ).rejects.toThrowError(Error);

    expect(materiaPrimaRepository.findOneById).toBeCalledTimes(2);
    expect(produtoRepository.save).not.toBeCalled();
    expect(produtoRepository.exists).toBeCalled();
  });
});
