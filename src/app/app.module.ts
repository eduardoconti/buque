import { Module } from '@nestjs/common';

import { InfraModule } from '@infra/infra.module';

import {
  provideRegisterUserUseCase,
  provideUserAuthUseCase,
} from './app.provider';
@Module({
  imports: [InfraModule],
  providers: [provideRegisterUserUseCase, provideUserAuthUseCase],
  exports: [provideRegisterUserUseCase, provideUserAuthUseCase],
})
export class AppModule {}
