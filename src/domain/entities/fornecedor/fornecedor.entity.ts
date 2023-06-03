import { AggregateRoot } from '@domain/core';
import { Email, Nome, UUID } from '@domain/value-objects';

import type { FornecedorMateriaPrimaPrimitivesProps } from './fornecedor-materia-prima.entity';
import { FornecedorMateriaPrima } from './fornecedor-materia-prima.entity';

export interface FornecedorProps {
  nome: Nome;
  telefone: string;
  materiaPrimaTrabalhada: FornecedorMateriaPrima[];
  email?: Email;
  site?: string;
}

export interface FornecedorPrimitivesProps {
  id: string;
  nome: string;
  telefone: string;
  site?: string;
  dataInclusao: Date;
  dataAlteracao: Date;
  email?: string;
  materiaPrimaTrabalhada: Omit<
    FornecedorMateriaPrimaPrimitivesProps,
    'idFornecedor'
  >[];
}

interface MateriaPrimaTrabalhada {
  id: string;
  nome: string;
  descricao: string;
  valorUnitario: number;
  dataInclusao: Date;
  dataAlteracao: Date;
}

interface CreateFornecedorEntity {
  nome: string;
  telefone: string;
  site?: string;
  email?: string;
  materiaPrimaTrabalhada?: MateriaPrimaTrabalhada[];
}

export class Fornecedor extends AggregateRoot<FornecedorProps> {
  protected readonly _id!: UUID;

  get nome(): Nome {
    return this.props.nome;
  }

  get telefone(): string {
    return this.props.telefone;
  }

  get email(): Email | undefined {
    return this.props.email;
  }

  static create({
    nome,
    email,
    telefone,
    site,
    materiaPrimaTrabalhada,
  }: CreateFornecedorEntity): Fornecedor {
    const idFornecedor = UUID.generate();
    const entity = new Fornecedor({
      id: idFornecedor,
      props: {
        nome: new Nome(nome),
        email: email ? new Email(email) : undefined,
        telefone: telefone,
        site,
        materiaPrimaTrabalhada: materiaPrimaTrabalhada
          ? materiaPrimaTrabalhada.map((e) => {
              return FornecedorMateriaPrima.create({
                materiaPrima: {
                  id: e.id,
                  dataAlteracao: e.dataAlteracao,
                  dataInclusao: e.dataInclusao,
                  descricao: e.descricao,
                  nome: e.nome,
                  valorUnitario: e.valorUnitario,
                },
                idFornecedor: idFornecedor.value,
              });
            })
          : [],
      },
    });

    return entity;
  }

  adicionaMateriaPrimaTrabalhada(materiaPrima: MateriaPrimaTrabalhada): void {
    this.props.materiaPrimaTrabalhada.push(
      FornecedorMateriaPrima.create({
        materiaPrima,
        idFornecedor: this.id.value,
      }),
    );
  }
}
