import { Module } from '@nestjs/common';

import { AppModule } from '@app/app.module';

import { InfraModule } from '@infra/infra.module';

import { AuthController } from './controllers/auth/auth.controller';
import { ListarClientesController } from './controllers/cliente/listar-clientes';
import { RegistrarClienteController } from './controllers/cliente/registrar-cliente';
import { HealthCheckController } from './controllers/health-check';
import { ListarMateriaPrimaController } from './controllers/materia-prima/listar-materia-prima';
import { RegistrarMateriaPrimaController } from './controllers/materia-prima/registrar-materia-prima';
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
  ],
})
export class PresentationModule {}
