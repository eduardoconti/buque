import { Module } from '@nestjs/common';

import { InfraModule } from '@infra/infra.module';

import {
  provideRegisterUserUseCase,
  provideRegistrarClienteUseCase,
  provideRegistrarCompraUseCase,
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
    provideRegistrarCompraUseCase,
  ],
  exports: [
    provideRegisterUserUseCase,
    provideUserAuthUseCase,
    provideRegistrarProdutoUseCase,
    provideRegistrarMateriaPrimaUseCase,
    provideRegistrarClienteUseCase,
    provideRegistrarFornecedorUseCase,
    provideRegistrarPedidoUseCase,
    provideRegistrarCompraUseCase,
  ],
})
export class AppModule {}
