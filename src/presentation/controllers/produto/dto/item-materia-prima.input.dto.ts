import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ItemMateriaPrima {
  @ApiProperty()
  @IsString()
  id!: string;
  @ApiProperty()
  @IsNumber()
  quantidade!: number;
}
