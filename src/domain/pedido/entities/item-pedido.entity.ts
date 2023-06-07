import { Entity } from '@domain/core';
import { MateriaPrima } from '@domain/materia-prima/entities';
import type { PropriedadesPrimitivasProduto } from '@domain/produto/entities';
import { ProdutoMateriaPrima } from '@domain/produto/entities';
import { Produto } from '@domain/produto/entities';
import { Quantidade } from '@domain/value-objects';
import { Amount, DateVO, Nome, UUID } from '@domain/value-objects';

export interface PropriedadesItemPedido {
  idPedido: UUID;
  produto: Produto;
  quantidade: Quantidade;
}

export interface PropriedadesPrimitivasItemPedido {
  id: string;
  idPedido: string;
  produto: PropriedadesPrimitivasProduto;
  quantidade: number;
  dataInclusao: Date;
  dataAlteracao: Date;
}
export class ItemPedido extends Entity<PropriedadesItemPedido> {
  protected readonly _id!: UUID;

  get idPedido(): UUID {
    return this.props.idPedido;
  }

  get produto(): Produto {
    return this.props.produto;
  }

  get quantidade(): Quantidade {
    return this.props.quantidade;
  }

  get valor(): Amount {
    const valor = this.quantidade.value * this.produto.valor.value;
    return new Amount(valor);
  }

  static create({
    produto,
    idPedido,
    quantidade,
  }: Omit<
    PropriedadesPrimitivasItemPedido,
    'id' | 'dataAlteracao' | 'dataInclusao'
  >): ItemPedido {
    return new ItemPedido({
      id: UUID.generate(),
      props: {
        produto: new Produto({
          id: new UUID(produto.id),
          dataAlteracao: new DateVO(produto.dataAlteracao),
          dataInclusao: new DateVO(produto.dataInclusao),
          props: {
            descricao: produto.descricao,
            nome: new Nome(produto.nome),
            valor: new Amount(produto.valor),
            precoCusto: new Amount(produto.precoCusto),
            produtoMateriaPrima: produto.produtoMateriaPrima.map(
              (e) =>
                new ProdutoMateriaPrima({
                  id: new UUID(e.id),
                  dataAlteracao: new DateVO(e.dataAlteracao),
                  dataInclusao: new DateVO(e.dataInclusao),
                  props: {
                    idProduto: new UUID(produto.id),
                    materiaPrima: new MateriaPrima({
                      id: new UUID(e.materiaPrima.id),
                      dataAlteracao: new DateVO(e.materiaPrima.dataAlteracao),
                      dataInclusao: new DateVO(e.materiaPrima.dataInclusao),
                      props: {
                        descricao: e.materiaPrima.descricao,
                        nome: new Nome(e.materiaPrima.nome),
                        valorUnitario: new Amount(e.materiaPrima.valorUnitario),
                      },
                    }),
                    quantidade: e.quantidade,
                  },
                }),
            ),
          },
        }),
        idPedido: new UUID(idPedido),
        quantidade: new Quantidade(quantidade),
      },
    });
  }

  adicionaQuantidade(quantidade: Quantidade): void {
    this.props.quantidade = new Quantidade(
      quantidade.value + this.quantidade.value,
    );
  }
}
