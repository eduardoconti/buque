import type { Provider } from '@nestjs/common';

import {
  MateriaPrimaMemoryRepository,
  ProdutoMemoryRepository,
} from './database/memory';
import { PrismaService, UserRepository } from './database/prisma';

export const provideUserRepository: Provider<UserRepository> = {
  provide: UserRepository,
  useFactory: (prismaService: PrismaService) => {
    return new UserRepository(prismaService);
  },
  inject: [PrismaService],
};

export const provideProdutoMemoryRepository: Provider<ProdutoMemoryRepository> =
  {
    provide: ProdutoMemoryRepository,
    useFactory: () => {
      return new ProdutoMemoryRepository();
    },
  };

export const provideMateriaPrimaMemoryRepository: Provider<MateriaPrimaMemoryRepository> =
  {
    provide: MateriaPrimaMemoryRepository,
    useFactory: () => {
      return new MateriaPrimaMemoryRepository();
    },
  };
