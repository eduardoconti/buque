import { Injectable } from '@nestjs/common';

import type { IProdutoRepository } from '@domain/core/repository';
import type { Produto } from '@domain/produto/entities';
import type { Nome, UUID } from '@domain/value-objects';

import {
  ProdutoNotFoundException,
  ProdutoRepositoryException,
} from '@infra/exceptions';

import { ProdutoModel } from '../models';
import { PrismaService } from './prisma.service';

@Injectable()
export class ProdutoRepository implements IProdutoRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(entity: Produto): Promise<Produto> {
    try {
      const { produto_materia_prima, ...model } =
        ProdutoModel.fromEntity(entity);

      const saved = await this.prismaService.produto.create({
        data: {
          ...model,
          produto_materia_prima: {
            create: produto_materia_prima.map(
              ({
                id,
                id_materiaPrima,
                data_alteracao,
                data_inclusao,
                quantidade,
              }) => {
                return {
                  id,
                  id_materiaPrima,
                  data_alteracao,
                  data_inclusao,
                  quantidade,
                };
              },
            ),
          },
        },
        include: { produto_materia_prima: true },
      });
      return ProdutoModel.toEntity(saved);
    } catch (e) {
      console.log(e);
      throw new ProdutoRepositoryException('falha ao registrar produto', e);
    }
  }

  async findOneById(id: UUID): Promise<Produto> {
    const model = await this.prismaService.produto
      .findUnique({
        where: {
          id: id.value,
        },
        include: {
          produto_materia_prima: true,
        },
      })
      .catch((e) => {
        throw new ProdutoRepositoryException('falha ao buscar produto', e);
      });

    if (!model) {
      throw new ProdutoNotFoundException('produto nao encontrado');
    }
    return ProdutoModel.toEntity(model);
  }

  async exists(nome: Nome): Promise<boolean> {
    try {
      const model = await this.prismaService.produto.findUnique({
        where: { nome: nome.value },
      });

      return model ? true : false;
    } catch (error) {
      throw new ProdutoRepositoryException('falha ao buscar produto', error);
    }
  }
}
