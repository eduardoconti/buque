import { ApiProperty } from '@nestjs/swagger';

export class ListarItemPedidoOutput {
  @ApiProperty()
  produto!: string;
  @ApiProperty()
  quantidade!: number;
  @ApiProperty()
  valor_unitario!: number;
  @ApiProperty()
  total!: number;
}
