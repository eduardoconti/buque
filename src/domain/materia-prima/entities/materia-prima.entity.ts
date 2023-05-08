import { Entity } from '@domain/core';
import { Amount } from '@domain/value-objects';
import { Nome } from '@domain/value-objects';
import { UUID } from '@domain/value-objects';

export interface PropriedadesMateriaPrima {
  nome: Nome;
  descricao: string;
  valorUnitario: Amount;
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

  get descricao(): string {
    return this.props.descricao;
  }

  get valorUnitario(): Amount {
    return this.props.valorUnitario;
  }

  static create({
    nome,
    descricao,
    valorUnitario,
  }: Omit<
    PropriedadesPrimitivasMateriaPrima,
    'id' | 'dataAlteracao' | 'dataInclusao'
  >): MateriaPrima {
    return new MateriaPrima({
      id: UUID.generate(),
      props: {
        nome: new Nome(nome),
        descricao,
        valorUnitario: new Amount(valorUnitario),
      },
    });
  }
}
