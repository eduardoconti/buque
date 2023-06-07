import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ItemPedidoInput {
  @ApiProperty()
  @IsString()
  id_produto!: string;
  @ApiProperty()
  @IsNumber()
  quantidade!: number;
}
