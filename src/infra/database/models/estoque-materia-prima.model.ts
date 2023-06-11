import { EstoqueMateriaPrima } from '@domain/materia-prima/entities';
import { Amount, DateVO, Quantidade, UUID } from '@domain/value-objects';

export class EstoqueMateriaPrimaModel {
  id!: string;
  id_materia_prima!: string;
  data_inclusao!: Date;
  data_alteracao!: Date;
  id_compra!: string;
  quantidade!: number;
  custo_unitario!: number;
  encerrado!: boolean;

  static toEntity({
    id,
    data_alteracao,
    data_inclusao,
    //id_compra,
    quantidade,
    custo_unitario,
    encerrado,
    id_materia_prima,
  }: EstoqueMateriaPrimaModel): EstoqueMateriaPrima {
    return new EstoqueMateriaPrima({
      id: new UUID(id),
      dataAlteracao: new DateVO(data_alteracao),
      dataInclusao: new DateVO(data_inclusao),
      props: {
        idMateriaPrima: new UUID(id_materia_prima),
        quantidade: new Quantidade(quantidade),
        custoUnitario: new Amount(custo_unitario),
        encerrado,
      },
    });
  }

  static fromEntity(entity: EstoqueMateriaPrima): EstoqueMateriaPrimaModel {
    return {
      custo_unitario: entity.custoUnitario.value,
      data_alteracao: entity.dataAlteracao.value,
      data_inclusao: entity.dataInclusao.value,
      encerrado: entity.props.encerrado,
      id: entity.id.value,
      id_compra: '',
      id_materia_prima: entity.idMateriaPrima.value,
      quantidade: entity.quantidade.value,
    };
  }
}
