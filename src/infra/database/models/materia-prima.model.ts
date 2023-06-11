import { MateriaPrima } from '@domain/materia-prima/entities';
import { DateVO, Nome, UUID } from '@domain/value-objects';

import { EstoqueMateriaPrimaModel } from './estoque-materia-prima.model';
import { Model } from './model';

export class MateriaPrimaModel extends Model {
  nome!: string;
  descricao!: string;
  estoque_materia_prima?: EstoqueMateriaPrimaModel[];

  static toEntity({
    id,
    data_alteracao,
    data_inclusao,
    nome,
    descricao,
    estoque_materia_prima,
  }: MateriaPrimaModel): MateriaPrima {
    return new MateriaPrima({
      id: new UUID(id),
      dataAlteracao: new DateVO(data_alteracao),
      dataInclusao: new DateVO(data_inclusao),
      props: {
        nome: new Nome(nome),
        descricao,
        estoqueMateriaPrima: estoque_materia_prima?.map((e) =>
          EstoqueMateriaPrimaModel.toEntity(e),
        ),
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
      estoque_materia_prima: entity.estoqueMateriaPrima?.map((e) =>
        EstoqueMateriaPrimaModel.fromEntity(e),
      ),
    };
  }
}
