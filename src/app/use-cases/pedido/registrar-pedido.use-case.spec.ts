/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { mockRegistrarPedidoUseCaseInput } from '@app/__mocks__';
import { provideRegistrarPedidoUseCase } from '@app/app.provider';

import { mockClienteEntity, mockProdutoEntity } from '@domain/__mocks__';
import type {
  IClienteRepository,
  IPedidoRepository,
  IProdutoRepository,
} from '@domain/core';
import type { Pedido } from '@domain/pedido/entities';
import type { IRegistrarPedidoUseCase } from '@domain/pedido/use-cases';

import { ClienteRepository, ProdutoRepository } from '@infra/database/prisma';
import { PedidoRepository } from '@infra/database/prisma/pedido.repository';

import { RegistrarPedidoUseCase } from './registrar-pedido.use-case';

describe('RegistrarPedidoUseCase', () => {
  let registrarProdutouseCase: IRegistrarPedidoUseCase;
  let produtoRepository: IProdutoRepository;
  let clienteRepository: IClienteRepository;
  let pedidoRepository: IPedidoRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        provideRegistrarPedidoUseCase,
        {
          provide: ProdutoRepository,
          useValue: {
            findOneById: jest.fn(),
          },
        },
        {
          provide: ClienteRepository,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: PedidoRepository,
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    registrarProdutouseCase = app.get<IRegistrarPedidoUseCase>(
      RegistrarPedidoUseCase,
    );
    produtoRepository = app.get<IProdutoRepository>(ProdutoRepository);
    clienteRepository = app.get<IClienteRepository>(ClienteRepository);
    pedidoRepository = app.get<IPedidoRepository>(PedidoRepository);
  });

  it('should be defined', () => {
    expect(registrarProdutouseCase).toBeDefined();
    expect(produtoRepository).toBeDefined();
    expect(clienteRepository).toBeDefined();
    expect(pedidoRepository).toBeDefined();
  });

  it('deve executar com sucesso', async () => {
    jest
      .spyOn(clienteRepository, 'findOne')
      .mockResolvedValue(mockClienteEntity);

    jest
      .spyOn(produtoRepository, 'findOneById')
      .mockResolvedValue(mockProdutoEntity);

    jest.spyOn(pedidoRepository, 'save').mockResolvedValue({} as Pedido);

    const result = await registrarProdutouseCase.execute(
      mockRegistrarPedidoUseCaseInput,
    );
    expect(result).toBeDefined();
  });
});
