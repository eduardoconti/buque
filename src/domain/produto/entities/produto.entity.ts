import { Entity } from '@domain/core';
import { Amount } from '@domain/value-objects';
import { Nome } from '@domain/value-objects';
import { UUID } from '@domain/value-objects';

import type { PropriedadesPrimitivasProdutoMateriaPrima } from './produto-materia-prima.entity';
import { ProdutoMateriaPrima } from './produto-materia-prima.entity';

export interface PropriedadesProduto {
  nome: Nome;
  descricao: string;
  produtoMateriaPrima: ProdutoMateriaPrima[];
  valor: Amount;
  precoCusto: Amount;
}

export interface PropriedadesPrimitivasProduto {
  id: string;
  nome: string;
  descricao: string;
  produtoMateriaPrima: PropriedadesPrimitivasProdutoMateriaPrima[];
  dataInclusao: Date;
  dataAlteracao: Date;
  valor: number;
  precoCusto: number;
}

export class Produto extends Entity<PropriedadesProduto> {
  protected readonly _id!: UUID;

  get nome(): Nome {
    return this.props.nome;
  }

  get descricao(): string {
    return this.props.descricao;
  }

  get valor(): Amount {
    return this.props.valor;
  }

  get precoCusto(): Amount {
    return this.props.precoCusto;
  }

  static create({
    nome,
    descricao,
    produtoMateriaPrima,
    valor,
  }: Omit<
    PropriedadesPrimitivasProduto,
    | 'id'
    | 'dataAlteracao'
    | 'dataInclusao'
    | 'produtoMateriaPrima'
    | 'precoCusto'
  > & {
    produtoMateriaPrima: Omit<
      PropriedadesPrimitivasProdutoMateriaPrima,
      'id' | 'dataAlteracao' | 'dataInclusao' | 'idProduto'
    >[];
  }): Produto {
    const idProduto = UUID.generate();
    const zero = 0;
    const produto = new Produto({
      id: idProduto,
      props: {
        nome: new Nome(nome),
        descricao,
        valor: new Amount(valor),
        precoCusto: new Amount(zero),
        produtoMateriaPrima: produtoMateriaPrima.map((e) =>
          ProdutoMateriaPrima.create({
            materiaPrima: e.materiaPrima,
            idProduto: idProduto.value,
            quantidade: e.quantidade,
          }),
        ),
      },
    });
    produto.calculaCusto();
    return produto;
  }

  // adicionaMateriaPrima(
  //   materiaPrima: Omit<PropriedadesPrimitivasProdutoMateriaPrima, 'id'>[],
  // ): void {
  //   materiaPrima.forEach(({ idMateriaPrima, quantidade }) => {
  //     const materiaPrimaPertencenteAoProduto = this.encontraMateriaPrima(
  //       new UUID(idMateriaPrima),
  //     );

  //     if (materiaPrimaPertencenteAoProduto) {
  //       materiaPrimaPertencenteAoProduto.adicionaQuantidade(quantidade);
  //       return;
  //     }

  //     this.props.produtoMateriaPrima.push(
  //       ProdutoMateriaPrima.create({
  //         idMateriaPrima,
  //         quantidade,
  //         idProduto: this.id.value,
  //       }),
  //     );
  //   });
  // }

  alteraNomeDoProduto(nome: Nome): void {
    this.props.nome = nome;
  }

  alteraDescricao(descricao: string): void {
    this.props.descricao = descricao;
  }

  calculaCusto(): number {
    const zero = 0;
    const precoCusto = this.props.produtoMateriaPrima.reduce(
      (total: number, e: ProdutoMateriaPrima) => {
        return (total +=
          e.props.quantidade * e.props.materiaPrima.valorUnitario.value);
      },
      zero,
    );

    this.props.precoCusto = new Amount(precoCusto);
    return precoCusto;
  }

  // private encontraMateriaPrima(
  //   idMateriaPrima: UUID,
  // ): ProdutoMateriaPrima | undefined {
  //   return this.props.produtoMateriaPrima.find((e) =>
  //     e.props.materiaPrima.id.equals(idMateriaPrima),
  //   );
  // }
}
