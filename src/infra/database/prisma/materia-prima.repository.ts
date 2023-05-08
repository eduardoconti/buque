import type { IMateriaPrimaRepository } from '@domain/core';
import type { MateriaPrima } from '@domain/materia-prima/entities';
import type { UUID } from '@domain/value-objects';

import {
  MateriaPrimaNotFoundException,
  MateriaPrimaRepositoryException,
} from '@infra/exceptions';

import { MateriaPrimaModel } from '../models';
import type { PrismaService } from './prisma.service';

export class MateriaPrimaRepository implements IMateriaPrimaRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findOneById(id: UUID): Promise<MateriaPrima> {
    const model = await this.prismaService.materia_prima
      .findUnique({
        where: {
          id: id.value,
        },
        include: {
          produto_materia_prima: true,
        },
      })
      .catch((e) => {
        throw new MateriaPrimaRepositoryException(
          'falha ao buscar matéria prima',
          e,
        );
      });

    if (!model) {
      throw new MateriaPrimaNotFoundException('matéria prima nao encontrado');
    }
    return MateriaPrimaModel.toEntity(model);
  }

  async save(entity: MateriaPrima): Promise<MateriaPrima> {
    try {
      const model = MateriaPrimaModel.fromEntity(entity);

      const saved = await this.prismaService.materia_prima.create({
        data: model,
      });
      return MateriaPrimaModel.toEntity(saved);
    } catch (e) {
      throw new MateriaPrimaRepositoryException(
        'falha ao registrar matéria prima',
        e,
      );
    }
  }
}
