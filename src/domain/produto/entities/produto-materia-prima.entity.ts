import { Entity } from '@domain/core';
import { UUID } from '@domain/value-objects';

export interface PropriedadesProdutoMateriaPrima {
  idProduto: UUID;
  idMateriaPrima: UUID;
  quantidade: number;
}

export interface PropriedadesPrimitivasProdutoMateriaPrima {
  id: string;
  idProduto: string;
  idMateriaPrima: string;
  quantidade: number;
  dataInclusao: Date;
  dataAlteracao: Date;
}
export class ProdutoMateriaPrima extends Entity<PropriedadesProdutoMateriaPrima> {
  protected readonly _id!: UUID;

  static create({
    idMateriaPrima,
    idProduto,
    quantidade,
  }: Omit<
    PropriedadesPrimitivasProdutoMateriaPrima,
    'id' | 'dataAlteracao' | 'dataInclusao'
  >): ProdutoMateriaPrima {
    return new ProdutoMateriaPrima({
      id: UUID.generate(),
      props: {
        idMateriaPrima: new UUID(idMateriaPrima),
        idProduto: new UUID(idProduto),
        quantidade,
      },
    });
  }

  adicionaQuantidade(quantidade: number) {
    this.props.quantidade += quantidade;
  }
}
