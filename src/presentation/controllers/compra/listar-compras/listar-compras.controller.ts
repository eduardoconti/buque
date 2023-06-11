import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ISqlManager } from '@domain/core';

import { SqlManager } from '@infra/database/query';
import { JwtAuthGuard } from '@infra/guard';

import { ApiSuccessResponse } from '@presentation/__docs__';

import { ListarCompraOutput } from './dto';

@ApiTags('compra')
@Controller('compra')
@UseGuards(JwtAuthGuard)
export class ListarComprasController {
  constructor(
    @Inject(SqlManager)
    private readonly sqlManager: ISqlManager,
  ) {}
  @Get()
  @ApiSuccessResponse({
    model: ListarCompraOutput,
    isArray: true,
  })
  @ApiOperation({
    summary: 'Listar compras',
    description: 'Rota para listar compras',
  })
  async handle(): Promise<ListarCompraOutput[]> {
    const result = await this.sqlManager.executeQuery<ListarCompraOutput[]>(
      `select
      c.id,
      c.valor,
      f.nome as fornecedor,
      json_agg(json_build_object(
            'id',
      ic.id,
      'materia_prima',
      mp.nome,
      'quantidade',
      ic.quantidade,
      'valor_unitario',
      ic.valor_unitario,
      'total_item',
      ic.total_item  
          )) as item_compra,
      c.data_inclusao
    from
      buque.compra c
    inner join buque.itens_compra ic on
      ic.id_compra = c.id
    inner join buque.fornecedor f on
      f.id = c.id_fornecedor
    inner join buque.materia_prima mp on
      mp.id = ic.id_materia_prima
    group by
      c.id,
      f.nome`,
    );

    return result;
  }
}
