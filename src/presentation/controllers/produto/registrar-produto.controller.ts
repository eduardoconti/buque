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
  IRegistraProdutoUseCase,
  RegistraProdutoUseCase,
} from '@app/use-cases/produto';

import { JwtAuthGuard } from '@infra/guard';

import { ApiSuccessResponse } from '@presentation/__docs__';

import { RegistrarProdutoOutput } from './dto';
import { RegistrarProdutoInput } from './dto';

@ApiTags('produto')
@Controller('produto')
@UseGuards(JwtAuthGuard)
export class RegistrarProdutoController {
  constructor(
    @Inject(RegistraProdutoUseCase)
    private readonly registrarProdutouseCase: IRegistraProdutoUseCase,
  ) {}

  @Post()
  @ApiSuccessResponse({
    model: RegistrarProdutoOutput,
    statusCode: HttpStatus.CREATED,
  })
  @ApiOperation({
    summary: 'Registrar produto',
    description: 'Rota para registrar um produto',
  })
  @ApiBearerAuth()
  async handle(
    @Body()
    { materia_prima, nome, descricao, valor }: RegistrarProdutoInput,
  ): Promise<RegistrarProdutoOutput> {
    const { itemMateriaPrima, ...rest } =
      await this.registrarProdutouseCase.execute(
        RegistrarProdutoInput.mapToUseCaseInput({
          materia_prima,
          nome,
          descricao,
          valor,
        }),
      );
    return { ...rest, materia_prima: itemMateriaPrima };
  }
}
