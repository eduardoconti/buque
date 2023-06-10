import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RegistrarCompraUseCase } from '@app/use-cases/compra';

import { IRegistrarCompraUseCase } from '@domain/compra/use-cases';

import { JwtAuthGuard } from '@infra/guard';

import { ApiSuccessResponse } from '@presentation/__docs__';

import { RegistrarCompraOutput } from './dto';
import { RegistrarCompraInput } from './dto';

@ApiTags('compra')
@Controller('compra')
@UseGuards(JwtAuthGuard)
export class RegistrarCompraController {
  constructor(
    @Inject(RegistrarCompraUseCase)
    private readonly registrardComprauseCase: IRegistrarCompraUseCase,
  ) {}

  @Post()
  @ApiSuccessResponse({
    model: RegistrarCompraOutput,
    statusCode: HttpStatus.CREATED,
  })
  @ApiOperation({
    summary: 'Registrar compra',
    description: 'Rota para registrar um compra',
  })
  @ApiBearerAuth()
  async handle(
    @Body()
    { id_fornecedor, item_compra }: RegistrarCompraInput,
  ): Promise<RegistrarCompraOutput> {
    const { id, valor, itemCompra } =
      await this.registrardComprauseCase.execute(
        RegistrarCompraInput.mapToUseCaseInput({
          id_fornecedor,
          item_compra,
        }),
      );
    return {
      id,
      valor,
      item_compra: itemCompra.map((e) => {
        return {
          id_materia_prima: e.idMateriaPrima,
          quantidade: e.quantidade,
          total_item: e.valor,
          custo_unitario: e.valorUnitario,
        };
      }),
    };
  }
}
