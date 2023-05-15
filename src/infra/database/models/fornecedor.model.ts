import { Fornecedor } from '@domain/entities/fornecedor';
import { DateVO, Email, Nome, UUID } from '@domain/value-objects';

import { FornecedorMateriaPrimaModel } from './fornecedor-materia-prima.model';

export class FornecedorModel {
  id!: string;
  nome!: string;
  email?: string | null;
  site?: string | null;
  telefone!: string;
  data_inclusao!: Date;
  data_alteracao!: Date;
  fornecedor_materia_prima!: FornecedorMateriaPrimaModel[];

  static toEntity({
    id,
    data_inclusao,
    data_alteracao,
    nome,
    email,
    telefone,
    site,
    fornecedor_materia_prima,
  }: FornecedorModel): Fornecedor {
    return new Fornecedor({
      id: new UUID(id),
      dataAlteracao: new DateVO(data_alteracao),
      dataInclusao: new DateVO(data_inclusao),
      props: {
        nome: new Nome(nome),
        email: email ? new Email(email) : undefined,
        telefone,
        site: site ?? undefined,
        materiaPrimaTrabalhada: fornecedor_materia_prima.map((e) =>
          FornecedorMateriaPrimaModel.toEntity(e),
        ),
      },
    });
  }

  static fromEntity(entity: Fornecedor): FornecedorModel {
    return {
      id: entity.id.value,
      data_alteracao: entity.dataAlteracao.value,
      data_inclusao: entity.dataInclusao.value,
      nome: entity.nome.value,
      email: entity.email?.value,
      telefone: entity.telefone,
      fornecedor_materia_prima: entity.props.materiaPrimaTrabalhada.map((e) =>
        FornecedorMateriaPrimaModel.fromEntity(e),
      ),
    };
  }
}
