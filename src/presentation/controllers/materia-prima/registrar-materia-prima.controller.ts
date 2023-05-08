import { Body, Controller, HttpStatus, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  IRegistrarMateriaPrimaUseCase,
  RegistrarMateriaPrimaUseCase,
} from '@app/use-cases/materia-prima';

import { ApiSuccessResponse } from '@presentation/__docs__';

import { RegistrarMateriaPrimaOutput } from './dto';
import { RegistrarMateriaPrimaInput } from './dto';
@ApiTags('materia-prima')
@Controller('materia-prima')
export class RegistrarMateriaPrimaController {
  constructor(
    @Inject(RegistrarMateriaPrimaUseCase)
    private readonly registrarMateriaPrimauseCase: IRegistrarMateriaPrimaUseCase,
  ) {}

  @Post()
  @ApiSuccessResponse({
    model: RegistrarMateriaPrimaOutput,
    statusCode: HttpStatus.CREATED,
  })
  async handle(
    @Body() { nome, descricao, valor_unitario }: RegistrarMateriaPrimaInput,
  ): Promise<RegistrarMateriaPrimaOutput> {
    const { id, valorUnitario } =
      await this.registrarMateriaPrimauseCase.execute(
        RegistrarMateriaPrimaInput.mapToUseCaseInput({
          nome,
          descricao,
          valor_unitario,
        }),
      );
    return { id, nome, descricao, valor_unitario: valorUnitario };
  }
}
