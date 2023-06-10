import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

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
  async handle(): Promise<ListarCompraOutput[]> {
    const result = await this.sqlManager.executeQuery<ListarCompraOutput[]>(
      `select
      c.id,
      c.valor,
      f.nome as fornecedor, 
      json_agg(json_build_object(
        'id',
      ic.id,
      'quantidade',
      ic.quantidade,
      'valor_unitario',
      ic.valor_unitario,
      'total_item',
      ic.total_item  
      )) as item_compra,
      c.data_inclusao
    from
      buque.buque.compra c
    inner join buque.buque.itens_compra ic on
      ic.id_compra = c.id
    inner join buque.buque.fornecedor f on
      f.id = c.id_fornecedor 
    group by
      c.id,
      f.nome`,
    );

    return result;
  }
}
