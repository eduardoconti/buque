import { Entity } from '@domain/core';
import { Nome } from '@domain/value-objects';
import { UUID } from '@domain/value-objects';

import type { PropriedadesPrimitivasProdutoMateriaPrima } from './produto-materia-prima.entity';
import { ProdutoMateriaPrima } from './produto-materia-prima.entity';

export interface PropriedadesProduto {
  nome: Nome;
  descricao: string;
  codigo: number;
  produtoMateriaPrima: ProdutoMateriaPrima[];
}

export interface PropriedadesPrimitivasProduto {
  id: string;
  nome: string;
  descricao: string;
  codigo: number;
  produtoMateriaPrima: PropriedadesPrimitivasProdutoMateriaPrima[];
  dataInclusao: Date;
  dataAlteracao: Date;
}

export class Produto extends Entity<PropriedadesProduto> {
  protected readonly _id!: UUID;

  get nome(): Nome {
    return this.props.nome;
  }

  get descricao(): string {
    return this.props.descricao;
  }

  static create({
    nome,
    descricao,
    codigo,
    produtoMateriaPrima,
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
        codigo,
        descricao,
        produtoMateriaPrima: produtoMateriaPrima.map((e) =>
          ProdutoMateriaPrima.create({
            idMateriaPrima: e.idMateriaPrima,
            idProduto: idProduto.value,
            quantidade: e.quantidade,
          }),
        ),
      },
    });
  }

  adicionaMateriaPrima(
    materiaPrima: Omit<PropriedadesPrimitivasProdutoMateriaPrima, 'id'>[],
  ): void {
    materiaPrima.forEach(({ idMateriaPrima, quantidade }) => {
      const materiaPrimaPertencenteAoProduto = this.encontraMateriaPrima(
        new UUID(idMateriaPrima),
      );

      if (materiaPrimaPertencenteAoProduto) {
        materiaPrimaPertencenteAoProduto.adicionaQuantidade(quantidade);
        return;
      }

      this.props.produtoMateriaPrima.push(
        ProdutoMateriaPrima.create({
          idMateriaPrima,
          quantidade,
          idProduto: this.id.value,
        }),
      );
    });
  }

  alteraNomeDoProduto(nome: Nome): void {
    this.props.nome = nome;
  }

  alteraDescricao(descricao: string): void {
    this.props.descricao = descricao;
  }

  private encontraMateriaPrima(
    idMateriaPrima: UUID,
  ): ProdutoMateriaPrima | undefined {
    return this.props.produtoMateriaPrima.find((e) =>
      e.props.idMateriaPrima.equals(idMateriaPrima),
    );
  }
}
