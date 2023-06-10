import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { ListarItemCompraOutput } from './listar-item-compra.output.dto';

export class ListarCompraOutput {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  valor!: number;
  @ApiProperty()
  fornecedor!: string;
  @Type(() => ListarItemCompraOutput)
  @ApiProperty({ type: ListarItemCompraOutput, isArray: true })
  item_compra!: ListarItemCompraOutput[];
  @ApiProperty()
  data_inclusao!: Date;
}
