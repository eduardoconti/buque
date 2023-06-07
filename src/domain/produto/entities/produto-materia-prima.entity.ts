import { Entity } from '@domain/core';
import type { PropriedadesPrimitivasMateriaPrima } from '@domain/materia-prima/entities';
import { MateriaPrima } from '@domain/materia-prima/entities';
import { Amount, DateVO, Nome, UUID } from '@domain/value-objects';

export interface PropriedadesProdutoMateriaPrima {
  idProduto: UUID;
  materiaPrima: MateriaPrima;
  quantidade: number;
}

export interface PropriedadesPrimitivasProdutoMateriaPrima {
  id: string;
  idProduto: string;
  materiaPrima: PropriedadesPrimitivasMateriaPrima;
  quantidade: number;
  dataInclusao: Date;
  dataAlteracao: Date;
}
export class ProdutoMateriaPrima extends Entity<PropriedadesProdutoMateriaPrima> {
  protected readonly _id!: UUID;

  get idProduto(): UUID {
    return this.props.idProduto;
  }

  get materiaPrima(): MateriaPrima {
    return this.props.materiaPrima;
  }

  get quantidade(): number {
    return this.props.quantidade;
  }
  static create({
    materiaPrima,
    idProduto,
    quantidade,
  }: Omit<
    PropriedadesPrimitivasProdutoMateriaPrima,
    'id' | 'dataAlteracao' | 'dataInclusao'
  >): ProdutoMateriaPrima {
    return new ProdutoMateriaPrima({
      id: UUID.generate(),
      props: {
        materiaPrima: new MateriaPrima({
          id: new UUID(materiaPrima.id),
          dataAlteracao: new DateVO(materiaPrima.dataAlteracao),
          dataInclusao: new DateVO(materiaPrima.dataInclusao),
          props: {
            descricao: materiaPrima.descricao,
            nome: new Nome(materiaPrima.nome),
            valorUnitario: new Amount(materiaPrima.valorUnitario),
          },
        }),
        idProduto: new UUID(idProduto),
        quantidade,
      },
    });
  }

  adicionaQuantidade(quantidade: number): void {
    this.props.quantidade += quantidade;
  }

  toPrimitives(): PropriedadesPrimitivasProdutoMateriaPrima {
    return {
      dataAlteracao: this.dataAlteracao.value,
      dataInclusao: this.dataInclusao.value,
      id: this.id.value,
      idProduto: this.idProduto.value,
      quantidade: this.quantidade,
      materiaPrima: this.materiaPrima.toPrimitives(),
    };
  }
}
