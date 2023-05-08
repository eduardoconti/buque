import { Entity } from '@domain/core';
import { Nome } from '@domain/value-objects';
import { UUID } from '@domain/value-objects';

export interface PropriedadesMateriaPrima {
  nome: Nome;
  descricao: string;
}

export interface PropriedadesPrimitivasMateriaPrima {
  id: string;
  nome: string;
  descricao: string;
  dataInclusao: Date;
  dataAlteracao: Date;
  valorUnitario: number;
}
export class MateriaPrima extends Entity<PropriedadesMateriaPrima> {
  protected readonly _id!: UUID;

  get nome(): Nome {
    return this.props.nome;
  }

  static create({
    nome,
    descricao,
  }: Omit<
    PropriedadesPrimitivasMateriaPrima,
    'id' | 'dataAlteracao' | 'dataInclusao'
  >): MateriaPrima {
    return new MateriaPrima({
      id: UUID.generate(),
      props: {
        nome: new Nome(nome),
        descricao,
      },
    });
  }
}
