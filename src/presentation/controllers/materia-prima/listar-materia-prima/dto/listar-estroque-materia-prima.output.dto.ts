import { ApiProperty } from '@nestjs/swagger';

export class ListarEstoqueMateriaPrimaOutput {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  custo_unitario!: number;
  @ApiProperty()
  quantidade!: number;
  @ApiProperty()
  data_inclusao!: Date;
}
