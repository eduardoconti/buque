import { AggregateRoot } from '@domain/core';
import type { PropriedadesPrimitivasMateriaPrima } from '@domain/materia-prima/entities';
import { MateriaPrima } from '@domain/materia-prima/entities';
import { UUID } from '@domain/value-objects';

export interface FornecedorMateriaPrimaProps {
  materiaPrima: MateriaPrima;
  idFornecedor: UUID;
}

export interface FornecedorMateriaPrimaPrimitivesProps {
  id: string;
  idFornecedor: string;
  materiaPrima: PropriedadesPrimitivasMateriaPrima;
  dataInclusao: Date;
  dataAlteracao: Date;
}

interface CreateFornecedorMateriaPrimaEntity {
  materiaPrima: PropriedadesPrimitivasMateriaPrima;
  idFornecedor: string;
}

export class FornecedorMateriaPrima extends AggregateRoot<FornecedorMateriaPrimaProps> {
  protected readonly _id!: UUID;

  get nome(): MateriaPrima {
    return this.props.materiaPrima;
  }

  get idFornecedor(): UUID {
    return this.props.idFornecedor;
  }

  get materiaPrima(): MateriaPrima {
    return this.props.materiaPrima;
  }

  static create({
    materiaPrima,
    idFornecedor,
  }: CreateFornecedorMateriaPrimaEntity): FornecedorMateriaPrima {
    const id = UUID.generate();
    const entity = new FornecedorMateriaPrima({
      id,
      props: {
        idFornecedor: new UUID(idFornecedor),
        materiaPrima: MateriaPrima.fromPrimitives(materiaPrima),
      },
    });

    return entity;
  }
}
