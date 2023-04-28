import { Injectable } from '@nestjs/common';

import { IUserRepository, QueryParams } from '@domain/core/repository';
import { UserEntity, UserProps } from '@domain/entities';
import { DateVO, Email } from '@domain/value-objects';

import {
  UserNotFoundException,
  UserRepositoryException,
} from '@infra/exceptions';

import { UserModel } from '../models';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(entity: UserEntity): Promise<UserEntity> {
    try {
      const model = UserModel.fromEntity(entity);

      const saved = await this.prismaService.user.create({
        data: model,
      });
      return UserModel.toEntity(saved);
    } catch (e) {
      throw new UserRepositoryException('failed to create user on database', e);
    }
  }

  async findOne(params: QueryParams<UserProps>) {
    const model = await this.prismaService.user
      .findFirst({
        where: {
          id: params.id?.value,
          email: params.email?.value,
        },
      })
      .catch((e) => {
        throw new UserRepositoryException('failed to find user on database', e);
      });

    if (!model) {
      throw new UserNotFoundException('user not found');
    }
    return UserModel.toEntity(model);
  }

  async findMany(): Promise<UserEntity[] | []> {
    const models = await this.prismaService.user.findMany({}).catch((e) => {
      throw new UserRepositoryException(
        'failed to findMany user on database',
        e,
      );
    });
    return models.map((e) => UserModel.toEntity(e));
  }

  async update(entity: UserEntity): Promise<UserEntity> {
    const { id, email, name, password } = UserModel.fromEntity(entity);
    try {
      const saved = await this.prismaService.user.update({
        data: {
          email,
          name,
          password,
          updated_at: DateVO.now().value,
        },
        where: { id },
      });
      return UserModel.toEntity(saved as UserModel);
    } catch (e) {
      throw new UserRepositoryException('failed to update user on database', e);
    }
  }

  async exists(email: Email): Promise<boolean> {
    const model = await this.prismaService.user
      .findUnique({
        where: {
          email: email.value,
        },
      })
      .catch((e) => {
        throw new UserRepositoryException('failed to find user on database', e);
      });

    if (!model) {
      return false;
    }
    return true;
  }
}
