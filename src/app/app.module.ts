import { Module } from '@nestjs/common';

import { InfraModule } from '@infra/infra.module';

import {
  provideRegisterUserUseCase,
  provideRegistrarClienteUseCase,
  provideRegistrarFornecedorUseCase,
  provideRegistrarMateriaPrimaUseCase,
  provideRegistrarPedidoUseCase,
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
    provideRegistrarPedidoUseCase,
  ],
  exports: [
    provideRegisterUserUseCase,
    provideUserAuthUseCase,
    provideRegistrarProdutoUseCase,
    provideRegistrarMateriaPrimaUseCase,
    provideRegistrarClienteUseCase,
    provideRegistrarFornecedorUseCase,
    provideRegistrarPedidoUseCase,
  ],
})
export class AppModule {}
