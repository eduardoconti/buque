import { UserEntity } from '@domain/entities';
import { DateVO, Email, Name, Password, UUID } from '@domain/value-objects';

export class UserModel {
  id!: string;

  name!: string;

  email!: string;

  password!: string;

  created_at!: Date;

  updated_at!: Date;

  static fromEntity(userEntity: UserEntity): UserModel {
    const { id, name, email, password, createdAt, updatedAt } =
      UserEntity.toPrimitives(userEntity);

    return {
      id,
      name,
      email,
      password,
      created_at: createdAt,
      updated_at: updatedAt,
    };
  }

  static toEntity({
    id,
    name,
    email,
    password,
    created_at,
    updated_at,
  }: UserModel): UserEntity {
    return new UserEntity({
      id: new UUID(id),
      createdAt: new DateVO(created_at),
      updatedAt: new DateVO(updated_at),
      props: {
        name: new Name(name),
        email: new Email(email),
        password: new Password(password),
      },
    });
  }
}
