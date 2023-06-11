import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

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
  @ApiOperation({
    summary: 'Listar matéria prima',
    description: 'Rota para listar matéria prima',
  })
  async handle(): Promise<ListarMateriaPrimaOutput[]> {
    const result = await this.sqlManager.executeQuery<
      ListarMateriaPrimaOutput[]
    >(
      `select
      mp.id,
      mp.nome,
      mp.descricao,
      coalesce(SUM(emp.quantidade)::integer,
      0) as quantidade_total,
       case
        when COUNT(emp.id) > 0
            then json_agg(json_build_object(
        'id', emp.id,
        'custo_unitario',
        emp.custo_unitario,
        'quantidade',
        emp.quantidade,
        'data_inclusao',
        emp.data_inclusao)
      order by
        emp.data_inclusao)
        else '[]'::json
      end as estoque_materia_prima
    from
      buque.materia_prima mp
    left join buque.buque.estoque_materia_prima emp on
      emp.id_materia_prima = mp.id
    where
      (emp.encerrado = false
        or emp.encerrado is null)
    group by
      mp.id
    order by
      LOWER(mp.nome) asc`,
    );
    return result;
  }
}
