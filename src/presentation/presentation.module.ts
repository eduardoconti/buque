import { Module } from '@nestjs/common';

import { AppModule } from '@app/app.module';

import { InfraModule } from '@infra/infra.module';

import { AuthController } from './controllers/auth/auth.controller';
import { ListarClientesController } from './controllers/cliente/listar-clientes';
import { RegistrarClienteController } from './controllers/cliente/registrar-cliente';
import { ListarComprasController } from './controllers/compra/listar-compras';
import { RegistrarCompraController } from './controllers/compra/registrar-compra';
import {
  ListarFornecedoresController,
  RegistrarFornecedorController,
} from './controllers/fornecedor';
import { HealthCheckController } from './controllers/health-check';
import { ListarMateriaPrimaController } from './controllers/materia-prima/listar-materia-prima';
import { RegistrarMateriaPrimaController } from './controllers/materia-prima/registrar-materia-prima';
import { ListarPedidosController } from './controllers/pedido/listar-pedidos';
import { RegistrarPedidoController } from './controllers/pedido/registrar-pedido';
import { ListarProdutosController } from './controllers/produto/listar-produtos';
import { RegistrarProdutoController } from './controllers/produto/registrar-produto';
import { RegisterUserController } from './controllers/user';

@Module({
  imports: [AppModule, InfraModule],
  controllers: [
    HealthCheckController,
    RegisterUserController,
    AuthController,
    RegistrarProdutoController,
    RegistrarMateriaPrimaController,
    RegistrarClienteController,
    ListarProdutosController,
    ListarMateriaPrimaController,
    ListarClientesController,
    RegistrarFornecedorController,
    ListarFornecedoresController,
    RegistrarPedidoController,
    ListarPedidosController,
    RegistrarCompraController,
    ListarComprasController,
  ],
})
export class PresentationModule {}
