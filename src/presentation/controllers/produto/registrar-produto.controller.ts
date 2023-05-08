import { Body, Controller, HttpStatus, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  IRegistraProdutoUseCase,
  RegistraProdutoUseCase,
} from '@app/use-cases/produto';

import { ApiSuccessResponse } from '@presentation/__docs__';

import { RegistrarProdutoOutput } from './dto';
import { RegistrarProdutoInput } from './dto';

@ApiTags('produto')
@Controller('produto')
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
  async handle(
    @Body() { materia_prima, codigo, nome, descricao }: RegistrarProdutoInput,
  ): Promise<RegistrarProdutoOutput> {
    const result = await this.registrarProdutouseCase.execute(
      RegistrarProdutoInput.mapToUseCaseInput({
        materia_prima,
        codigo,
        nome,
        descricao,
      }),
    );
    return result;
  }
}
