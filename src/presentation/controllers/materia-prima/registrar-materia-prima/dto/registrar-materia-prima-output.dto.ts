import { ApiProperty } from '@nestjs/swagger';

export class RegistrarMateriaPrimaOutput {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  nome!: string;
  @ApiProperty()
  descricao!: string;
}
