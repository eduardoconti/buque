import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import type { RegistrarPedidoUseCaseInput } from '@domain/pedido/use-cases';

import { ItemPedidoInput } from './item-pedido.input.dto';

export class RegistrarPedidoInput {
  @IsString()
  @ApiProperty()
  id_cliente!: string;

  @ValidateNested()
  @Type(() => ItemPedidoInput)
  @ApiProperty({ type: ItemPedidoInput })
  item_pedido!: ItemPedidoInput[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  data_entrega?: Date;

  static mapToUseCaseInput({
    id_cliente,
    data_entrega,
    item_pedido,
  }: RegistrarPedidoInput): RegistrarPedidoUseCaseInput {
    return {
      idCliente: id_cliente,
      dataEntrega: data_entrega,
      itemPedido: item_pedido.map((e) => {
        return { idProduto: e.id_produto, quantidade: e.quantidade };
      }),
    };
  }
}
