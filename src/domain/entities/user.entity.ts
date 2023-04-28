import { AggregateRoot } from '@domain/core';

import { Email, Name, Password, UUID } from '../value-objects';

export type UserProps = {
  name: Name;
  email: Email;
  password: Password;
};

export type UserPrimitivesProps = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

type CreateUserEntity = Pick<
  UserPrimitivesProps,
  'name' | 'email' | 'password'
>;

export class UserEntity extends AggregateRoot<UserProps> {
  protected readonly _id!: UUID;

  static async create({
    name,
    email,
    password,
  }: CreateUserEntity): Promise<UserEntity> {
    const id = UUID.generate();
    const entity = new UserEntity({
      id,
      props: {
        name: new Name(name),
        email: new Email(email),
        password: await Password.hash(password),
      },
    });

    return entity;
  }

  static toPrimitives({
    id,
    props,
    createdAt,
    updatedAt,
  }: UserEntity): UserPrimitivesProps {
    return {
      id: id.value,
      name: props.name.value,
      email: props.email.value,
      password: props.password.value,
      createdAt: createdAt.value,
      updatedAt: updatedAt.value,
    };
  }
}
