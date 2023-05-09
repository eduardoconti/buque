import { Injectable } from '@nestjs/common';

import type { IClienteRepository, QueryParams } from '@domain/core/repository';
import type { Cliente, ClienteProps } from '@domain/entities/cliente';
import type { Email } from '@domain/value-objects';

import {
  ClienteNotFoundException,
  ClienteRepositoryException,
} from '@infra/exceptions';

import { ClienteModel } from '../models';
import { PrismaService } from './prisma.service';

@Injectable()
export class ClienteRepository implements IClienteRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(entity: Cliente): Promise<Cliente> {
    try {
      const model = ClienteModel.fromEntity(entity);

      const saved = await this.prismaService.cliente.create({
        data: model,
      });
      return ClienteModel.toEntity(saved);
    } catch (e) {
      throw new ClienteRepositoryException('falha ao registar cliente', e);
    }
  }

  async findOne(params: QueryParams<ClienteProps>): Promise<Cliente> {
    const model = await this.prismaService.cliente
      .findFirst({
        where: {
          id: params.id?.value,
          email: params.email?.value,
        },
      })
      .catch((e) => {
        throw new ClienteRepositoryException('falha ao buscar cliente', e);
      });

    if (!model) {
      throw new ClienteNotFoundException('cliente não encontrado');
    }
    return ClienteModel.toEntity(model);
  }

  async exists(email: Email): Promise<boolean> {
    const model = await this.prismaService.cliente
      .findUnique({
        where: {
          email: email.value,
        },
      })
      .catch((e: any) => {
        throw new ClienteRepositoryException('falha ao buscar cliente', e);
      });

    if (!model) {
      return false;
    }
    return true;
  }
}
