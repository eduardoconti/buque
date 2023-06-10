import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ItemCompraOutput {
  @ApiProperty()
  @IsString()
  id_materia_prima!: string;
  @ApiProperty()
  @IsNumber()
  quantidade!: number;
  @ApiProperty()
  @IsNumber()
  total_item!: number;
  @ApiProperty()
  @IsNumber()
  custo_unitario!: number;
}
