import { Module } from '@nestjs/common';

import { AppModule } from '@app/app.module';

import { InfraModule } from '@infra/infra.module';

import { AuthController } from './controllers/auth/auth.controller';
import { HealthCheckController } from './controllers/health-check';
import { RegistrarMateriaPrimaController } from './controllers/materia-prima';
import { RegistrarProdutoController } from './controllers/produto';
import { RegisterUserController } from './controllers/user';

@Module({
  imports: [AppModule, InfraModule],
  controllers: [
    HealthCheckController,
    RegisterUserController,
    AuthController,
    RegistrarProdutoController,
    RegistrarMateriaPrimaController,
  ],
})
export class PresentationModule {}
