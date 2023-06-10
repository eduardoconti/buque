import { ApiProperty } from '@nestjs/swagger';

export class ListarItemCompraOutput {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  quantidade!: number;
  @ApiProperty()
  valor_unitario!: number;
  @ApiProperty()
  total_item!: number;
}
