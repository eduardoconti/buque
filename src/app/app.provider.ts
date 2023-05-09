import type { Provider } from '@nestjs/common';

import type {
  IClienteRepository,
  IMateriaPrimaRepository,
  IProdutoRepository,
  IUserRepository,
} from '@domain/core';

import {
  ClienteRepository,
  MateriaPrimaRepository,
  ProdutoRepository,
} from '@infra/database/prisma';
import { UserRepository } from '@infra/database/prisma';

import { RegisterUserUseCase, UserAuthUseCase } from './use-cases';
import { RegistrarClienteUseCase } from './use-cases/cliente';
import { RegistrarMateriaPrimaUseCase } from './use-cases/materia-prima';
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
    useFactory: (materiaPrimaRepository: IClienteRepository) => {
      return new RegistrarClienteUseCase(materiaPrimaRepository);
    },
    inject: [ClienteRepository],
  };
