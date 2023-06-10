import { ApiProperty } from '@nestjs/swagger';

import type { ItemCompraOutput } from './item-compra.output.dto';

export class RegistrarCompraOutput {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  item_compra!: ItemCompraOutput[];
  @ApiProperty()
  valor!: number;
}
