import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ISqlManager } from '@domain/core';

import { SqlManager } from '@infra/database/query';
import { JwtAuthGuard } from '@infra/guard';

import { ApiSuccessResponse } from '@presentation/__docs__';

import { ListarProdutoOutput } from './dto';

@ApiTags('produto')
@Controller('produto')
@UseGuards(JwtAuthGuard)
export class ListarProdutosController {
  constructor(
    @Inject(SqlManager)
    private readonly sqlManager: ISqlManager,
  ) {}
  @Get()
  @ApiSuccessResponse({
    model: ListarProdutoOutput,
    isArray: true,
  })
  async handle(): Promise<ListarProdutoOutput[]> {
    const result = await this.sqlManager.executeQuery<ListarProdutoOutput[]>(
      `select
      p.id,
      p.nome,
      p.descricao,
      p.valor,
      json_agg(json_build_object(
      'id',
      mp.id,
      'nome',
      mp.nome,
      'quantidade',
      pmp.quantidade)) as materia_prima
    from
      buque.produto p
    inner join buque.produto_materia_prima pmp on
      pmp.id_produto = p.id
    inner join buque.materia_prima mp on
      mp.id = pmp."id_materiaPrima"
    group by
      p.id
    order by LOWER(p.nome) asc`,
    );
    return result;
  }
}
