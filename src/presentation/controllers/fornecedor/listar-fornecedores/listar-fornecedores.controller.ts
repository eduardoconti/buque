import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ISqlManager } from '@domain/core';

import { SqlManager } from '@infra/database/query';
import { JwtAuthGuard } from '@infra/guard';

import { ApiSuccessResponse } from '@presentation/__docs__';

import { ListarFornecedoresOutput } from './dto';

@ApiTags('fornecedor')
@Controller('fornecedor')
@UseGuards(JwtAuthGuard)
export class ListarFornecedoresController {
  constructor(
    @Inject(SqlManager)
    private readonly sqlManager: ISqlManager,
  ) {}
  @Get()
  @ApiOperation({
    summary: 'Listar fornecedores',
    description: 'Rota para listar fornecedores',
  })
  @ApiSuccessResponse({
    model: ListarFornecedoresOutput,
    isArray: true,
  })
  async handle(): Promise<ListarFornecedoresOutput[]> {
    const result = await this.sqlManager.executeQuery<
      ListarFornecedoresOutput[]
    >(
      `select
      fn.id,
      fn.nome,
      fn.email,
      fn.telefone,
      fn.site
    from
      buque.fornecedor fn
    order by LOWER(fn.nome) asc`,
    );
    return result;
  }
}
