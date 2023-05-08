import { Module } from '@nestjs/common';

import { InfraModule } from '@infra/infra.module';

import {
  provideRegisterUserUseCase,
  provideRegistrarMateriaPrimaUseCase,
  provideRegistrarProdutoUseCase,
  provideUserAuthUseCase,
} from './app.provider';
@Module({
  imports: [InfraModule],
  providers: [
    provideRegisterUserUseCase,
    provideUserAuthUseCase,
    provideRegistrarProdutoUseCase,
    provideRegistrarMateriaPrimaUseCase,
  ],
  exports: [
    provideRegisterUserUseCase,
    provideUserAuthUseCase,
    provideRegistrarProdutoUseCase,
    provideRegistrarMateriaPrimaUseCase,
  ],
})
export class AppModule {}
