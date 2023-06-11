import { Entity } from '@domain/core';
import { ArgumentInvalidException } from '@domain/exceptions';
import type { Amount } from '@domain/value-objects';
import { DateVO } from '@domain/value-objects';
import { Nome } from '@domain/value-objects';
import { UUID } from '@domain/value-objects';

import { EstoqueMateriaPrima } from './estoque-materia-prima.entity';
import type { PropriedadesPrimitivasEstoqueMateriaPrima } from './estoque-materia-prima.entity';
const primeira_posicao_estoque = 0;
export interface PropriedadesMateriaPrima {
  nome: Nome;
  descricao: string;
  estoqueMateriaPrima?: EstoqueMateriaPrima[];
}

export interface PropriedadesPrimitivasMateriaPrima {
  id: string;
  nome: string;
  descricao: string;
  dataInclusao: Date;
  dataAlteracao: Date;
  estoqueMateriaPrima?: PropriedadesPrimitivasEstoqueMateriaPrima[];
}
export class MateriaPrima extends Entity<PropriedadesMateriaPrima> {
  protected readonly _id!: UUID;

  get nome(): Nome {
    return this.props.nome;
  }

  get descricao(): string {
    return this.props.descricao;
  }

  get valorUnitario(): Amount {
    if (!this.estoqueMateriaPrima) {
      throw new ArgumentInvalidException('estoque nao encontrado');
    }
    return this.estoqueMateriaPrima[primeira_posicao_estoque].custoUnitario;
  }

  get estoqueMateriaPrima(): EstoqueMateriaPrima[] | undefined {
    return this.props.estoqueMateriaPrima;
  }

  static create({
    nome,
    descricao,
    estoqueMateriaPrima,
  }: Omit<
    PropriedadesPrimitivasMateriaPrima,
    'id' | 'dataAlteracao' | 'dataInclusao'
  > & {
    estoqueMateriaPrima?: EstoqueMateriaPrima[];
  }): MateriaPrima {
    return new MateriaPrima({
      id: UUID.generate(),
      props: {
        nome: new Nome(nome),
        descricao,
        estoqueMateriaPrima,
      },
    });
  }

  static fromPrimitives({
    id,
    dataAlteracao,
    dataInclusao,
    descricao,
    nome,
    estoqueMateriaPrima,
  }: PropriedadesPrimitivasMateriaPrima): MateriaPrima {
    return new MateriaPrima({
      id: new UUID(id),
      dataAlteracao: new DateVO(dataAlteracao),
      dataInclusao: new DateVO(dataInclusao),
      props: {
        descricao,
        nome: new Nome(nome),
        estoqueMateriaPrima: estoqueMateriaPrima?.map((e) =>
          EstoqueMateriaPrima.fromPrimitives(e),
        ),
      },
    });
  }

  toPrimitives(): PropriedadesPrimitivasMateriaPrima {
    return {
      dataAlteracao: this.dataAlteracao.value,
      dataInclusao: this.dataInclusao.value,
      descricao: this.props.descricao,
      id: this.id.value,
      nome: this.nome.value,
      estoqueMateriaPrima: this.estoqueMateriaPrima?.map((e) =>
        e.toPrimitives(),
      ),
    };
  }
}
