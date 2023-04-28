import { Module } from '@nestjs/common';

import { AppModule } from '@app/app.module';

import { InfraModule } from '@infra/infra.module';

import { AuthController } from './controllers/auth/auth.controller';
import { HealthCheckController } from './controllers/health-check';
import { RegisterUserController } from './controllers/user';

@Module({
  imports: [AppModule, InfraModule],
  controllers: [HealthCheckController, RegisterUserController, AuthController],
})
export class PresentationModule {}
