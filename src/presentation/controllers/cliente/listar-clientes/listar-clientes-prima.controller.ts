import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ISqlManager } from '@domain/core';

import { SqlManager } from '@infra/database/query';
import { JwtAuthGuard } from '@infra/guard';

import { ApiSuccessResponse } from '@presentation/__docs__';

import { ListarClientesOutput } from './dto';

@ApiTags('cliente')
@Controller('cliente')
@UseGuards(JwtAuthGuard)
export class ListarClientesController {
  constructor(
    @Inject(SqlManager)
    private readonly sqlManager: ISqlManager,
  ) {}
  @Get()
  @ApiSuccessResponse({
    model: ListarClientesOutput,
    isArray: true,
  })
  async handle(): Promise<ListarClientesOutput[]> {
    const result = await this.sqlManager.executeQuery<ListarClientesOutput[]>(
      `select
      cl.id,
      cl.nome,
      cl.email ,
      cl.telefone
    from
      buque.cliente cl
    order by LOWER(cl.nome) asc`,
    );
    return result;
  }
}
