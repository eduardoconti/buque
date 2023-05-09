import type { Provider } from '@nestjs/common';

import {
  MateriaPrimaMemoryRepository,
  ProdutoMemoryRepository,
} from './database/memory';
import {
  ClienteRepository,
  PrismaService,
  UserRepository,
  MateriaPrimaRepository,
  ProdutoRepository,
} from './database/prisma';
import { SqlManager } from './database/query';

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

export const provideProdutoRepository: Provider<ProdutoRepository> = {
  provide: ProdutoRepository,
  useFactory: (prisma: PrismaService) => {
    return new ProdutoRepository(prisma);
  },
  inject: [PrismaService],
};

export const provideMateriaPrimaRepository: Provider<MateriaPrimaRepository> = {
  provide: MateriaPrimaRepository,
  useFactory: (prisma: PrismaService) => {
    return new MateriaPrimaRepository(prisma);
  },
  inject: [PrismaService],
};

export const provideClienteRepository: Provider<ClienteRepository> = {
  provide: ClienteRepository,
  useFactory: (prisma: PrismaService) => {
    return new ClienteRepository(prisma);
  },
  inject: [PrismaService],
};

export const provideSqlManager: Provider<SqlManager> = {
  provide: SqlManager,
  useFactory: (prisma: PrismaService) => {
    return new SqlManager(prisma);
  },
  inject: [PrismaService],
};
