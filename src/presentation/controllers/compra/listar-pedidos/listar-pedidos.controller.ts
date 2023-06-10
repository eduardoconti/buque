import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ISqlManager } from '@domain/core';

import { SqlManager } from '@infra/database/query';
import { JwtAuthGuard } from '@infra/guard';

import { ApiSuccessResponse } from '@presentation/__docs__';

import { ListarPedidoOutput } from './dto';

@ApiTags('pedido')
@Controller('pedido')
@UseGuards(JwtAuthGuard)
export class ListarPedidosController {
  constructor(
    @Inject(SqlManager)
    private readonly sqlManager: ISqlManager,
  ) {}
  @Get()
  @ApiSuccessResponse({
    model: ListarPedidoOutput,
    isArray: true,
  })
  async handle(): Promise<ListarPedidoOutput[]> {
    const result = await this.sqlManager.executeQuery<ListarPedidoOutput[]>(
      `select
      p.id,
      c.nome ,
      p.valor,
      p.status,
      p.data_entrega,
      p.data_inclusao,
      json_agg(json_build_object(
      'id',
      ip.id,
      'produto',
      pdt.nome,
      'quantidade',
      ip.quantidade,
      'valor_unitario',
      pdt.valor,
      'total',
      (ip.quantidade * pdt.valor))) as item_pedido
    from
      buque.buque.pedido p
    inner join buque.buque.cliente c on
      c.id = p.id_cliente
    inner join buque.buque.itens_pedido ip on
      ip.id_pedido = p.id
    inner join buque.buque.produto pdt on
      pdt.id = ip.id_produto
    group by
      p.id,
      c.nome
    order by
      p.data_inclusao desc`,
    );

    return result;
  }
}
