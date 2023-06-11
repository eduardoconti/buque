import { Entity } from '@domain/core';
import { DateVO, Quantidade } from '@domain/value-objects';
import { Amount } from '@domain/value-objects';
import { UUID } from '@domain/value-objects';

export interface PropriedadesEstoqueMateriaPrima {
  idMateriaPrima: UUID;
  quantidade: Quantidade;
  custoUnitario: Amount;
  encerrado: boolean;
}

export interface PropriedadesPrimitivasEstoqueMateriaPrima {
  id: string;
  idMateriaPrima: string;
  quantidade: number;
  custoUnitario: number;
  dataInclusao: Date;
  dataAlteracao: Date;
  encerrado: boolean;
}

export class EstoqueMateriaPrima extends Entity<PropriedadesEstoqueMateriaPrima> {
  protected readonly _id!: UUID;

  get custoUnitario(): Amount {
    return this.props.custoUnitario;
  }

  get idMateriaPrima(): UUID {
    return this.props.idMateriaPrima;
  }

  get quantidade(): Quantidade {
    return this.props.quantidade;
  }

  static create({
    custoUnitario,
    idMateriaPrima,
    quantidade,
  }: Omit<
    PropriedadesPrimitivasEstoqueMateriaPrima,
    'id' | 'dataAlteracao' | 'dataInclusao' | 'encerrado'
  >): EstoqueMateriaPrima {
    return new EstoqueMateriaPrima({
      id: UUID.generate(),
      props: {
        idMateriaPrima: new UUID(idMateriaPrima),
        quantidade: new Quantidade(quantidade),
        custoUnitario: new Amount(custoUnitario),
        encerrado: false,
      },
    });
  }

  static fromPrimitives({
    id,
    dataAlteracao,
    dataInclusao,
    idMateriaPrima,
    quantidade,
    custoUnitario,
    encerrado,
  }: PropriedadesPrimitivasEstoqueMateriaPrima): EstoqueMateriaPrima {
    return new EstoqueMateriaPrima({
      id: new UUID(id),
      dataAlteracao: new DateVO(dataAlteracao),
      dataInclusao: new DateVO(dataInclusao),
      props: {
        idMateriaPrima: new UUID(idMateriaPrima),
        quantidade: new Quantidade(quantidade),
        custoUnitario: new Amount(custoUnitario),
        encerrado,
      },
    });
  }

  toPrimitives(): PropriedadesPrimitivasEstoqueMateriaPrima {
    return {
      dataAlteracao: this.dataAlteracao.value,
      dataInclusao: this.dataInclusao.value,
      idMateriaPrima: this.props.idMateriaPrima.value,
      id: this.id.value,
      quantidade: this.props.quantidade.value,
      custoUnitario: this.props.custoUnitario.value,
      encerrado: this.props.encerrado,
    };
  }
}
