import { Injectable } from '@nestjs/common';

import type {
  IFornecedorRepository,
  QueryParams,
} from '@domain/core/repository';
import type {
  Fornecedor,
  FornecedorMateriaPrima,
  FornecedorProps,
} from '@domain/entities/fornecedor';
import type { UUID } from '@domain/value-objects';

import {
  FornecedorNotFoundException,
  FornecedorRepositoryException,
} from '@infra/exceptions';

import { FornecedorMateriaPrimaModel, FornecedorModel } from '../models';
import { PrismaService } from './prisma.service';

@Injectable()
export class FornecedorRepository implements IFornecedorRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(entity: Fornecedor): Promise<Fornecedor> {
    try {
      const { fornecedor_materia_prima, ...model } =
        FornecedorModel.fromEntity(entity);

      const saved = await this.prismaService.fornecedor.create({
        data: {
          ...model,
          fornecedor_materia_prima: {
            create: fornecedor_materia_prima.map(
              ({ id, data_inclusao, data_alteracao, id_materia_prima }) => {
                return {
                  id,
                  data_alteracao,
                  data_inclusao,
                  id_materia_prima: id_materia_prima,
                };
              },
            ),
          },
        },
        include: {
          fornecedor_materia_prima: {
            include: {
              materia_prima: true,
            },
          },
        },
      });
      return FornecedorModel.toEntity(saved);
    } catch (e) {
      console.log(e);
      throw new FornecedorRepositoryException(
        'falha ao registar fornecedor',
        e,
      );
    }
  }

  async findOne(params: QueryParams<FornecedorProps>): Promise<Fornecedor> {
    const model = await this.prismaService.fornecedor
      .findFirst({
        where: {
          id: params.id?.value,
        },
        include: {
          fornecedor_materia_prima: {
            include: {
              materia_prima: true,
            },
          },
        },
      })
      .catch((e) => {
        throw new FornecedorRepositoryException(
          'falha ao buscar fornecedor',
          e,
        );
      });

    if (!model) {
      throw new FornecedorNotFoundException('fornecedor não encontrado');
    }
    return FornecedorModel.toEntity(model);
  }

  async findMateriaPrimaTrabalhada(
    idFornecedor: UUID,
  ): Promise<FornecedorMateriaPrima[]> {
    const model = await this.prismaService.fornecedor_materia_prima.findMany({
      where: { id_fornecedor: idFornecedor.value },
      include: { materia_prima: true },
    });
    if (!model.length) {
      throw new FornecedorNotFoundException('fornecedor não encontrado');
    }
    return model.map((e) => FornecedorMateriaPrimaModel.toEntity(e));
  }
}
