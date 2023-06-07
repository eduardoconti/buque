import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import type { ItemPedidoOutput } from './item-pedido.output.dto';

export class RegistrarPedidoOutput {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  item_pedido!: ItemPedidoOutput[];
  @ApiProperty()
  valor!: number;
  @ApiPropertyOptional()
  data_entrega?: Date;
}
