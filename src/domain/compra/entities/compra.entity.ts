import { Entity } from '@domain/core';
import type { Amount } from '@domain/value-objects';
import type { Quantidade } from '@domain/value-objects';
import { UUID } from '@domain/value-objects';

import { calculaValorItens } from '../services';
import type { PropriedadesPrimitivasItemCompra } from './item-compra.entity';
import { ItemCompra } from './item-compra.entity';

export interface PropriedadesCompra {
  idFornecedor: UUID;
  itensCompra: ItemCompra[];
  valor: Amount;
}

export interface PropriedadesPrimitivasCompra {
  id: string;
  idFornecedor: string;
  itensCompra: PropriedadesPrimitivasItemCompra[];
  dataInclusao: Date;
  dataAlteracao: Date;
  valor: number;
}

export class Compra extends Entity<PropriedadesCompra> {
  protected readonly _id!: UUID;

  get idFornecedor(): UUID {
    return this.props.idFornecedor;
  }

  get valor(): Amount {
    return this.props.valor;
  }

  get itensCompra(): ItemCompra[] {
    return this.props.itensCompra;
  }

  static create({
    idFornecedor,
    itensCompra,
  }: Pick<PropriedadesPrimitivasCompra, 'idFornecedor'> & {
    itensCompra: Pick<
      PropriedadesPrimitivasItemCompra,
      'idMateriaPrima' | 'quantidade' | 'totalItem'
    >[];
  }): Compra {
    const idCompra = UUID.generate();
    const itens = itensCompra.map((item) =>
      ItemCompra.create({ ...item, idCompra: idCompra.value }),
    );
    const produto = new Compra({
      id: idCompra,
      props: {
        valor: calculaValorItens(itens),
        idFornecedor: new UUID(idFornecedor),
        itensCompra: itens,
      },
    });
    return produto;
  }

  gerarLancamentoEstoque(): {
    custoUnitario: Amount;
    idMateriaPrima: UUID;
    id: UUID;
    quantidade: Quantidade;
  }[] {
    return this.itensCompra.map((item) => {
      return {
        custoUnitario: item.valorUnitario,
        idMateriaPrima: item.idMateriaPrima,
        id: UUID.generate(),
        quantidade: item.quantidade,
      };
    });
  }
}
