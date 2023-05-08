import type { Provider } from '@nestjs/common';

import type {
  IMateriaPrimaRepository,
  IProdutoRepository,
  IUserRepository,
} from '@domain/core';

import {
  MateriaPrimaMemoryRepository,
  ProdutoMemoryRepository,
} from '@infra/database/memory';
import { UserRepository } from '@infra/database/prisma';

import { RegisterUserUseCase, UserAuthUseCase } from './use-cases';
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
    inject: [ProdutoMemoryRepository, MateriaPrimaMemoryRepository],
  };
