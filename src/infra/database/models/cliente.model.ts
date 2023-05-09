import { Cliente } from '@domain/entities/cliente';
import { DateVO, Email, Nome, UUID } from '@domain/value-objects';

export class ClienteModel {
  id!: string;
  nome!: string;
  email?: string | null;
  telefone!: string;
  data_inclusao!: Date;
  data_alteracao!: Date;

  static toEntity({
    id,
    data_inclusao,
    data_alteracao,
    nome,
    email,
    telefone,
  }: ClienteModel): Cliente {
    return new Cliente({
      id: new UUID(id),
      dataAlteracao: new DateVO(data_alteracao),
      dataInclusao: new DateVO(data_inclusao),
      props: {
        nome: new Nome(nome),
        email: email ? new Email(email) : undefined,
        telefone,
      },
    });
  }

  static fromEntity(entity: Cliente): ClienteModel {
    return {
      id: entity.id.value,
      data_alteracao: entity.dataAlteracao.value,
      data_inclusao: entity.dataInclusao.value,
      nome: entity.nome.value,
      email: entity.email?.value,
      telefone: entity.telefone,
    };
  }
}
