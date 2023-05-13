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
}

export interface PropriedadesPrimitivasProduto {
  id: string;
  nome: string;
  descricao: string;
  produtoMateriaPrima: PropriedadesPrimitivasProdutoMateriaPrima[];
  dataInclusao: Date;
  dataAlteracao: Date;
  valor: number;
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

  static create({
    nome,
    descricao,
    produtoMateriaPrima,
    valor,
  }: Omit<
    PropriedadesPrimitivasProduto,
    'id' | 'dataAlteracao' | 'dataInclusao' | 'produtoMateriaPrima'
  > & {
    produtoMateriaPrima: Omit<
      PropriedadesPrimitivasProdutoMateriaPrima,
      'id' | 'dataAlteracao' | 'dataInclusao' | 'idProduto'
    >[];
  }): Produto {
    const idProduto = UUID.generate();
    return new Produto({
      id: idProduto,
      props: {
        nome: new Nome(nome),
        descricao,
        valor: new Amount(valor),
        produtoMateriaPrima: produtoMateriaPrima.map((e) =>
          ProdutoMateriaPrima.create({
            materiaPrima: e.materiaPrima,
            idProduto: idProduto.value,
            quantidade: e.quantidade,
          }),
        ),
      },
    });
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
    return this.props.produtoMateriaPrima.reduce(
      (total: number, e: ProdutoMateriaPrima) => {
        return (total +=
          e.props.quantidade * e.props.materiaPrima.valorUnitario.value);
      },
      zero,
    );
  }

  // private encontraMateriaPrima(
  //   idMateriaPrima: UUID,
  // ): ProdutoMateriaPrima | undefined {
  //   return this.props.produtoMateriaPrima.find((e) =>
  //     e.props.materiaPrima.id.equals(idMateriaPrima),
  //   );
  // }
}
