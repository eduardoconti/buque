import { Provider } from '@nestjs/common';

import { PrismaService, UserRepository } from './database/prisma';

export const provideUserRepository: Provider<UserRepository> = {
  provide: UserRepository,
  useFactory: (prismaService: PrismaService) => {
    return new UserRepository(prismaService);
  },
  inject: [PrismaService],
};
