import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { ListarItemPedidoOutput } from './listar-item-pedido.output.dto';

export class ListarPedidoOutput {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  nome!: string;
  @ApiProperty()
  status!: string;
  @ApiProperty()
  valor!: number;
  @Type(() => ListarItemPedidoOutput)
  @ApiProperty({ type: ListarItemPedidoOutput, isArray: true })
  itens!: ListarItemPedidoOutput[];
  @ApiPropertyOptional()
  data_entrega!: Date;
  @ApiProperty()
  data_inclusao!: Date;
}
