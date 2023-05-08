import { Body, Controller, Inject, Post } from '@nestjs/common';

import {
  IRegistraProdutoUseCase,
  RegistraProdutoUseCase,
} from '@app/use-cases/produto';

import type { RegistrarProdutoOutput } from './dto';
import { RegistrarProdutoInput } from './dto';

@Controller('produto')
export class RegistrarProdutoController {
  constructor(
    @Inject(RegistraProdutoUseCase)
    private readonly registrarProdutouseCase: IRegistraProdutoUseCase,
  ) {}

  @Post()
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
