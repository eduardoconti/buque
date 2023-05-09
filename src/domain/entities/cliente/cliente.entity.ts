import { AggregateRoot } from '@domain/core';
import { Email, Nome, UUID } from '@domain/value-objects';

export interface ClienteProps {
  nome: Nome;
  email?: Email;
  telefone: string;
}

export interface ClientePrimitivesProps {
  id: string;
  nome: string;
  email?: string;
  telefone: string;
  dataInclusao: Date;
  dataAlteracao: Date;
}

type CreateClienteEntity = Pick<
  ClientePrimitivesProps,
  'nome' | 'email' | 'telefone'
>;

export class Cliente extends AggregateRoot<ClienteProps> {
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

  static create({ nome, email, telefone }: CreateClienteEntity): Cliente {
    const id = UUID.generate();
    const entity = new Cliente({
      id,
      props: {
        nome: new Nome(nome),
        email: email ? new Email(email) : undefined,
        telefone: telefone,
      },
    });

    return entity;
  }
}
