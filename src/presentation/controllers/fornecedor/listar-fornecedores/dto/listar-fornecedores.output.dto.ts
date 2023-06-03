import { ApiProperty } from '@nestjs/swagger';

export class ListarFornecedoresOutput {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  nome!: string;
  @ApiProperty()
  telefone!: string;
  @ApiProperty()
  email!: string;
}
