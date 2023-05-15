import { FornecedorMateriaPrima } from '@domain/entities/fornecedor';
import { DateVO, UUID } from '@domain/value-objects';

import { MateriaPrimaModel } from './materia-prima.model';

export class FornecedorMateriaPrimaModel {
  id!: string;
  data_inclusao!: Date;
  data_alteracao!: Date;
  id_fornecedor!: string;
  id_materia_prima!: string;
  materia_prima!: MateriaPrimaModel;

  static toEntity({
    id,
    data_alteracao,
    data_inclusao,
    id_fornecedor,
    materia_prima,
  }: FornecedorMateriaPrimaModel): FornecedorMateriaPrima {
    return new FornecedorMateriaPrima({
      id: new UUID(id),
      dataAlteracao: new DateVO(data_alteracao),
      dataInclusao: new DateVO(data_inclusao),
      props: {
        idFornecedor: new UUID(id_fornecedor),
        materiaPrima: MateriaPrimaModel.toEntity(materia_prima),
      },
    });
  }

  static fromEntity(
    entity: FornecedorMateriaPrima,
  ): FornecedorMateriaPrimaModel {
    return {
      id: entity.id.value,
      data_alteracao: entity.dataAlteracao.value,
      data_inclusao: entity.dataInclusao.value,
      id_fornecedor: entity.idFornecedor.value,
      id_materia_prima: entity.materiaPrima.id.value,
      materia_prima: MateriaPrimaModel.fromEntity(entity.materiaPrima),
    };
  }
}
