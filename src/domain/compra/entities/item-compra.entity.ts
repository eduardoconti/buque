import { Entity } from '@domain/core';
import { Quantidade } from '@domain/value-objects';
import { Amount } from '@domain/value-objects';
import { UUID } from '@domain/value-objects';

import { calculaCustoUnitario } from '../services';

export interface PropriedadesItemCompra {
  idCompra: UUID;
  idMateriaPrima: UUID;
  quantidade: Quantidade;
  totalItem: Amount;
  valorUnitario: Amount;
}

export interface PropriedadesPrimitivasItemCompra {
  id: string;
  idCompra: string;
  idMateriaPrima: string;
  quantidade: number;
  dataInclusao: Date;
  dataAlteracao: Date;
  totalItem: number;
  valorUnitario: number;
}
export class ItemCompra extends Entity<PropriedadesItemCompra> {
  protected readonly _id!: UUID;

  get idCompra(): UUID {
    return this.props.idCompra;
  }

  get quantidade(): Quantidade {
    return this.props.quantidade;
  }

  get totalItem(): Amount {
    return this.props.totalItem;
  }

  get idMateriaPrima(): UUID {
    return this.props.idMateriaPrima;
  }

  get valorUnitario(): Amount {
    return this.props.valorUnitario;
  }

  static create({
    idMateriaPrima,
    idCompra,
    quantidade,
    totalItem,
  }: Omit<
    PropriedadesPrimitivasItemCompra,
    'id' | 'dataAlteracao' | 'dataInclusao' | 'valorUnitario'
  >): ItemCompra {
    const quantidadeVo = new Quantidade(quantidade);
    const totalItemVo = new Amount(totalItem);
    return new ItemCompra({
      id: UUID.generate(),
      props: {
        idMateriaPrima: new UUID(idMateriaPrima),
        idCompra: new UUID(idCompra),
        quantidade: quantidadeVo,
        totalItem: totalItemVo,
        valorUnitario: calculaCustoUnitario(totalItemVo, quantidadeVo),
      },
    });
  }
}
