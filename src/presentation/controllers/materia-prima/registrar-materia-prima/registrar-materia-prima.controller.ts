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
  IRegistrarMateriaPrimaUseCase,
  RegistrarMateriaPrimaUseCase,
} from '@app/use-cases/materia-prima';

import { JwtAuthGuard } from '@infra/guard';

import { ApiSuccessResponse } from '@presentation/__docs__';

import { RegistrarMateriaPrimaOutput } from './dto';
import { RegistrarMateriaPrimaInput } from './dto';
@ApiTags('materia-prima')
@Controller('materia-prima')
@UseGuards(JwtAuthGuard)
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
  @ApiOperation({
    summary: 'Registrar matéria prima',
    description: 'Rota para registrar uma matéria prima',
  })
  @ApiBearerAuth()
  async handle(
    @Body() { nome, descricao }: RegistrarMateriaPrimaInput,
  ): Promise<RegistrarMateriaPrimaOutput> {
    const { id } = await this.registrarMateriaPrimauseCase.execute(
      RegistrarMateriaPrimaInput.mapToUseCaseInput({
        nome,
        descricao,
      }),
    );
    return { id, nome, descricao };
  }
}
