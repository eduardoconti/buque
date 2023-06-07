import { Injectable } from '@nestjs/common';

import type { IPedidoRepository } from '@domain/core/repository';
import type { Pedido } from '@domain/pedido/entities';

import { PedidoRepositoryException } from '@infra/exceptions';

import { PedidoModel } from '../models/pedido.model';
import { PrismaService } from './prisma.service';

@Injectable()
export class PedidoRepository implements IPedidoRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(entity: Pedido): Promise<Pedido> {
    try {
      const { itens, ...model } = PedidoModel.fromEntity(entity);

      const saved = await this.prismaService.pedido.create({
        data: {
          ...model,
          itens: {
            create: itens.map(
              ({
                data_alteracao,
                data_inclusao,
                id,
                id_produto,
                quantidade,
              }) => {
                return {
                  data_alteracao,
                  data_inclusao,
                  id,
                  id_produto,
                  quantidade,
                };
              },
            ),
          },
        },
        include: {
          cliente: true,
          itens: {
            include: {
              produto: {
                include: {
                  produto_materia_prima: { include: { materia_prima: true } },
                },
              },
            },
          },
        },
      });
      return PedidoModel.toEntity(saved);
    } catch (e) {
      throw new PedidoRepositoryException(
        'failed to save Pedido on database',
        e,
      );
    }
  }
}
