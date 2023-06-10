import { Injectable } from '@nestjs/common';

import type { Compra } from '@domain/compra/entities';
import type { ICompraRepository } from '@domain/core/repository';

import { CompraRepositoryException } from '@infra/exceptions';

import { CompraModel } from '../models';
import { PrismaService } from './prisma.service';

@Injectable()
export class CompraRepository implements ICompraRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(entity: Compra): Promise<Compra> {
    try {
      const lancamentoEstoque = entity.gerarLancamentoEstoque();
      const { itens_compra, ...model } = CompraModel.fromEntity(entity);

      const saved = await this.prismaService.compra.create({
        data: {
          ...model,
          itens_compra: {
            create: itens_compra.map(
              ({
                data_alteracao,
                data_inclusao,
                id,
                id_materia_prima,
                quantidade,
                valor_unitario,
                total_item,
              }) => {
                return {
                  data_alteracao,
                  data_inclusao,
                  id,
                  materia_prima: { connect: { id: id_materia_prima } },
                  quantidade,
                  valor_unitario,
                  total_item,
                };
              },
            ),
          },
          estoque_materia_prima: {
            create: lancamentoEstoque.map(
              ({ custoUnitario, idMateriaPrima, id, quantidade }) => {
                return {
                  id: id.value,
                  custo_unitario: custoUnitario.value,
                  id_materia_prima: idMateriaPrima.value,
                  quantidade: quantidade.value,
                };
              },
            ),
          },
        },
        include: {
          fornecedor: true,
          itens_compra: true,
        },
      });
      return CompraModel.toEntity(saved);
    } catch (e) {
      throw new CompraRepositoryException(
        'failed to save Compra on database',
        e,
      );
    }
  }
}
