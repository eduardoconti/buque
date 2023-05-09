import { Module } from '@nestjs/common';

import { InfraModule } from '@infra/infra.module';

import {
  provideRegisterUserUseCase,
  provideRegistrarClienteUseCase,
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
    provideRegistrarClienteUseCase,
  ],
  exports: [
    provideRegisterUserUseCase,
    provideUserAuthUseCase,
    provideRegistrarProdutoUseCase,
    provideRegistrarMateriaPrimaUseCase,
    provideRegistrarClienteUseCase,
  ],
})
export class AppModule {}
