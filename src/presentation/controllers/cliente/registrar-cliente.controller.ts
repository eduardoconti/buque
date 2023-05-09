import { Body, Controller, HttpStatus, Inject, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  IRegistrarClienteUseCase,
  RegistrarClienteUseCase,
} from '@app/use-cases/cliente';

import {
  ApiInternalServerErrorResponse,
  ApiSuccessResponse,
} from '@presentation/__docs__';

import { RegistrarClienteInput, RegistrarClienteOutput } from './dto';

@ApiTags('cliente')
@Controller('cliente')
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
