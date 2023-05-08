import { Module } from '@nestjs/common';

import { InfraModule } from '@infra/infra.module';

import {
  provideRegisterUserUseCase,
  provideRegistrarProdutoUseCase,
  provideUserAuthUseCase,
} from './app.provider';
@Module({
  imports: [InfraModule],
  providers: [
    provideRegisterUserUseCase,
    provideUserAuthUseCase,
    provideRegistrarProdutoUseCase,
  ],
  exports: [
    provideRegisterUserUseCase,
    provideUserAuthUseCase,
    provideRegistrarProdutoUseCase,
  ],
})
export class AppModule {}
