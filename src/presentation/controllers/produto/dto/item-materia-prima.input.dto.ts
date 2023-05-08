import { ApiProperty } from '@nestjs/swagger';

export class ItemMateriaPrima {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  quantidade!: number;
}
