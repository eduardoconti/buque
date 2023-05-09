import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { PrismaService } from '@infra/database/prisma';
import {
  BaseExceptionFilter,
  HttpExceptionFilter,
  UnknownExceptionFilter,
} from '@infra/exception-filter';
import { LoggingInterceptor } from '@infra/interceptors';
import { ValidationPipe } from '@infra/pipes';

import type { EnvironmentVariables } from './main/config';
import { DEFAULT_PORT } from './main/config';
import { MainModule } from './main/main.module';
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(MainModule);
  const logger = app.get(Logger);
  app.useGlobalInterceptors(new LoggingInterceptor(logger));
  app.useGlobalFilters(new UnknownExceptionFilter(logger));
  app.useGlobalFilters(new BaseExceptionFilter(logger));
  app.useGlobalFilters(new HttpExceptionFilter(logger));

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*',
  });

  const prismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  const configService = app.get(ConfigService<EnvironmentVariables>);
  const config = new DocumentBuilder()
    .setTitle('API Buque')
    .setDescription('API para genrenciamento da loja  `Buquê Encantado`')
    .setVersion('1.0')
    .addServer(
      `http://localhost:${configService.get<number>('PORT') ?? DEFAULT_PORT}`,
      'Local',
    )
    //.addServer(`https://buque-api-qx46.onrender.com`, 'Production')
    .addTag('health-check', 'Endpoints para monitoramento da api')
    .addTag('auth', 'Endpoints para autenticação')
    .addTag('user', 'Endpoints para gerenciamento de usuário')
    .addTag('cliente', 'Endpoints para gerenciamento de cliente')
    .addTag('materia-prima', 'Endpoints para gerenciamento de matéria prima')
    .addTag('produto', 'Endpoints para gerenciamento de produto')
    .addBearerAuth({
      type: 'http',
      description: 'Todos os endpoints precisam do token de acesso!',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(configService.get('PORT') | DEFAULT_PORT);
}
bootstrap();
