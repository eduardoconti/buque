import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RegistrarPedidoUseCase } from '@app/use-cases/pedido';

import { IRegistrarPedidoUseCase } from '@domain/pedido/use-cases';

import { JwtAuthGuard } from '@infra/guard';

import { ApiSuccessResponse } from '@presentation/__docs__';

import { RegistrarPedidoOutput } from './dto';
import { RegistrarPedidoInput } from './dto';

@ApiTags('pedido')
@Controller('pedido')
@UseGuards(JwtAuthGuard)
export class RegistrarPedidoController {
  constructor(
    @Inject(RegistrarPedidoUseCase)
    private readonly registrarPedidouseCase: IRegistrarPedidoUseCase,
  ) {}

  @Post()
  @ApiSuccessResponse({
    model: RegistrarPedidoOutput,
    statusCode: HttpStatus.CREATED,
  })
  @ApiOperation({
    summary: 'Registrar produto',
    description: 'Rota para registrar um produto',
  })
  @ApiBearerAuth()
  async handle(
    @Body()
    { id_cliente, item_pedido, data_entrega }: RegistrarPedidoInput,
  ): Promise<RegistrarPedidoOutput> {
    const { id, itemPedido, valor, dataEntrega } =
      await this.registrarPedidouseCase.execute(
        RegistrarPedidoInput.mapToUseCaseInput({
          id_cliente,
          item_pedido,
          data_entrega,
        }),
      );
    return {
      id,
      valor,
      data_entrega: dataEntrega,
      item_pedido: itemPedido.map((e) => {
        return {
          quantidade: e.quantidade,
          id_produto: e.idProduto,
        };
      }),
    };
  }
}
