import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ISqlManager } from '@domain/core';

import { SqlManager } from '@infra/database/query';
import { JwtAuthGuard } from '@infra/guard';

import { ApiSuccessResponse } from '@presentation/__docs__';

import { ListarMateriaPrimaOutput } from './dto';

@ApiTags('materia-prima')
@Controller('materia-prima')
@UseGuards(JwtAuthGuard)
export class ListarMateriaPrimaController {
  constructor(
    @Inject(SqlManager)
    private readonly sqlManager: ISqlManager,
  ) {}
  @Get()
  @ApiSuccessResponse({
    model: ListarMateriaPrimaOutput,
    isArray: true,
  })
  async handle(): Promise<ListarMateriaPrimaOutput[]> {
    const result = await this.sqlManager.executeQuery<
      ListarMateriaPrimaOutput[]
    >(
      `select
      mp.id,
      mp.nome,
      mp.descricao ,
      mp.valor_unitario
    from
      buque.materia_prima mp
    order by LOWER(mp.nome) asc`,
    );
    return result;
  }
}
