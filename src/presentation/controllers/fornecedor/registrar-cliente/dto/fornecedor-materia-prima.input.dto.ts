import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FornecedorMateriaPrimaInput {
  @ApiProperty({ example: 'aebf8f20-5590-4bfe-9169-88445f7afe8e' })
  @IsString()
  id_materia_prima!: string;
}
