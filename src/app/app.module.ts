import { Module } from '@nestjs/common';

import { InfraModule } from '@infra/infra.module';

import {
  provideRegisterUserUseCase,
  provideRegistrarClienteUseCase,
  provideRegistrarFornecedorUseCase,
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
    provideRegistrarFornecedorUseCase,
  ],
  exports: [
    provideRegisterUserUseCase,
    provideUserAuthUseCase,
    provideRegistrarProdutoUseCase,
    provideRegistrarMateriaPrimaUseCase,
    provideRegistrarClienteUseCase,
    provideRegistrarFornecedorUseCase,
  ],
})
export class AppModule {}
