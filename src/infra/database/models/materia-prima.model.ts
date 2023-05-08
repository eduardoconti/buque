import { MateriaPrima } from '@domain/materia-prima/entities';
import { Amount, DateVO, Nome, UUID } from '@domain/value-objects';

import { Model } from './model';

export class MateriaPrimaModel extends Model {
  nome!: string;
  descricao!: string;
  valor_unitario!: number;

  static toEntity({
    id,
    data_alteracao,
    data_inclusao,
    nome,
    descricao,
    valor_unitario,
  }: MateriaPrimaModel): MateriaPrima {
    return new MateriaPrima({
      id: new UUID(id),
      dataAlteracao: new DateVO(data_alteracao),
      dataInclusao: new DateVO(data_inclusao),
      props: {
        nome: new Nome(nome),
        descricao,
        valorUnitario: new Amount(valor_unitario),
      },
    });
  }

  static fromEntity(entity: MateriaPrima): MateriaPrimaModel {
    return {
      id: entity.id.value,
      data_alteracao: entity.dataAlteracao.value,
      data_inclusao: entity.dataInclusao.value,
      nome: entity.nome.value,
      descricao: entity.descricao,
      valor_unitario: entity.valorUnitario.value,
    };
  }
}
