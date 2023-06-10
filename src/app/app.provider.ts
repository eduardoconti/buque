import type { Provider } from '@nestjs/common';

import type {
  IClienteRepository,
  ICompraRepository,
  IFornecedorRepository,
  IMateriaPrimaRepository,
  IPedidoRepository,
  IProdutoRepository,
  IUserRepository,
} from '@domain/core';

import {
  ClienteRepository,
  FornecedorRepository,
  MateriaPrimaRepository,
  ProdutoRepository,
} from '@infra/database/prisma';
import { UserRepository } from '@infra/database/prisma';
import { CompraRepository } from '@infra/database/prisma/compra.repository';
import { PedidoRepository } from '@infra/database/prisma/pedido.repository';

import { RegisterUserUseCase, UserAuthUseCase } from './use-cases';
import { RegistrarClienteUseCase } from './use-cases/cliente';
import { RegistrarCompraUseCase } from './use-cases/compra';
import { RegistrarFornecedorUseCase } from './use-cases/fornecedor';
import { RegistrarMateriaPrimaUseCase } from './use-cases/materia-prima';
import { RegistrarPedidoUseCase } from './use-cases/pedido';
import { RegistraProdutoUseCase } from './use-cases/produto';

export const provideUserAuthUseCase: Provider<UserAuthUseCase> = {
  provide: UserAuthUseCase,
  useFactory: (userRepository: IUserRepository) => {
    return new UserAuthUseCase(userRepository);
  },
  inject: [UserRepository],
};

export const provideRegisterUserUseCase: Provider<RegisterUserUseCase> = {
  provide: RegisterUserUseCase,
  useFactory: (mongo: IUserRepository) => {
    return new RegisterUserUseCase(mongo);
  },
  inject: [UserRepository],
};

export const provideRegistrarProdutoUseCase: Provider<RegistraProdutoUseCase> =
  {
    provide: RegistraProdutoUseCase,
    useFactory: (
      produtoRepository: IProdutoRepository,
      materiaPrimaRepository: IMateriaPrimaRepository,
    ) => {
      return new RegistraProdutoUseCase(
        produtoRepository,
        materiaPrimaRepository,
      );
    },
    inject: [ProdutoRepository, MateriaPrimaRepository],
  };

export const provideRegistrarMateriaPrimaUseCase: Provider<RegistrarMateriaPrimaUseCase> =
  {
    provide: RegistrarMateriaPrimaUseCase,
    useFactory: (materiaPrimaRepository: IMateriaPrimaRepository) => {
      return new RegistrarMateriaPrimaUseCase(materiaPrimaRepository);
    },
    inject: [MateriaPrimaRepository],
  };

export const provideRegistrarClienteUseCase: Provider<RegistrarClienteUseCase> =
  {
    provide: RegistrarClienteUseCase,
    useFactory: (clienteRepository: IClienteRepository) => {
      return new RegistrarClienteUseCase(clienteRepository);
    },
    inject: [ClienteRepository],
  };

export const provideRegistrarFornecedorUseCase: Provider<RegistrarFornecedorUseCase> =
  {
    provide: RegistrarFornecedorUseCase,
    useFactory: (
      fornecedorRepository: IFornecedorRepository,
      materiaPrimaRepository: IMateriaPrimaRepository,
    ) => {
      return new RegistrarFornecedorUseCase(
        fornecedorRepository,
        materiaPrimaRepository,
      );
    },
    inject: [FornecedorRepository, MateriaPrimaRepository],
  };

export const provideRegistrarPedidoUseCase: Provider<RegistrarPedidoUseCase> = {
  provide: RegistrarPedidoUseCase,
  useFactory: (
    produtoRepository: IProdutoRepository,
    clienteRepository: IClienteRepository,
    pedidoRepository: IPedidoRepository,
  ) => {
    return new RegistrarPedidoUseCase(
      produtoRepository,
      clienteRepository,
      pedidoRepository,
    );
  },
  inject: [ProdutoRepository, ClienteRepository, PedidoRepository],
};

export const provideRegistrarCompraUseCase: Provider<RegistrarCompraUseCase> = {
  provide: RegistrarCompraUseCase,
  useFactory: (
    materiaPrimaRepository: IMateriaPrimaRepository,
    fornecedorRepository: IFornecedorRepository,
    compraRepository: ICompraRepository,
  ) => {
    return new RegistrarCompraUseCase(
      materiaPrimaRepository,
      fornecedorRepository,
      compraRepository,
    );
  },
  inject: [MateriaPrimaRepository, FornecedorRepository, CompraRepository],
};
