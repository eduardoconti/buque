import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  IRegistrarClienteUseCase,
  RegistrarClienteUseCase,
} from '@app/use-cases/cliente';

import { JwtAuthGuard } from '@infra/guard';

import {
  ApiInternalServerErrorResponse,
  ApiSuccessResponse,
} from '@presentation/__docs__';

import { RegistrarClienteInput, RegistrarClienteOutput } from './dto';

@ApiTags('cliente')
@Controller('cliente')
@UseGuards(JwtAuthGuard)
export class RegistrarClienteController {
  constructor(
    @Inject(RegistrarClienteUseCase)
    private readonly registrarClienteUseCase: IRegistrarClienteUseCase,
  ) {}

  @Post('')
  @ApiOperation({
    summary: 'Registrar cliente',
    description: 'Rota para registrar um cliente',
  })
  @ApiSuccessResponse({
    model: RegistrarClienteOutput,
    statusCode: HttpStatus.CREATED,
  })
  @ApiInternalServerErrorResponse({
    title: 'ClienteRepositoryException',
    detail: 'database error',
  })
  @ApiBearerAuth()
  async handle(
    @Body() data: RegistrarClienteInput,
  ): Promise<RegistrarClienteOutput> {
    const { email, nome, id, telefone } =
      await this.registrarClienteUseCase.execute(
        RegistrarClienteInput.toUseCaseInput(data),
      );
    return { id, email, nome, telefone };
  }
}
