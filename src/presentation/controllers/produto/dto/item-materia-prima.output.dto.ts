import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ItemMateriaPrimaOutput {
  @ApiProperty()
  @IsString()
  id!: string;
  @ApiProperty()
  @IsNumber()
  quantidade!: number;
  @ApiProperty()
  @IsString()
  nome!: string;
}
