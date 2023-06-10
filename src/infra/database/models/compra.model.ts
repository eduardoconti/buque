import { Compra } from '@domain/compra/entities';
import { Amount, DateVO, UUID } from '@domain/value-objects';

import { ItemCompraModel } from './item-compra.model';

export class CompraModel {
  id!: string;
  id_fornecedor!: string;
  valor!: number;
  data_inclusao!: Date;
  data_alteracao!: Date;
  itens_compra!: ItemCompraModel[];

  static toEntity({
    id,
    id_fornecedor,
    valor,
    data_alteracao,
    data_inclusao,
    itens_compra,
  }: CompraModel): Compra {
    return new Compra({
      id: new UUID(id),
      dataAlteracao: new DateVO(data_alteracao),
      dataInclusao: new DateVO(data_inclusao),
      props: {
        idFornecedor: new UUID(id_fornecedor),
        valor: new Amount(valor),
        itensCompra: itens_compra.map((e) => ItemCompraModel.toEntity(e)),
      },
    });
  }

  static fromEntity(entity: Compra): Omit<CompraModel, 'itens'> & {
    itens_compra: Omit<ItemCompraModel, 'produto'>[];
  } {
    return {
      id: entity.id.value,
      data_alteracao: entity.dataAlteracao.value,
      data_inclusao: entity.dataInclusao.value,
      id_fornecedor: entity.idFornecedor.value,
      valor: entity.valor.value,
      itens_compra: entity.itensCompra.map((e) => ItemCompraModel.toModel(e)),
    };
  }
}
