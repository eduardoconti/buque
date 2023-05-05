import { UserAlreadyExistsException } from '@app/exceptions';

import { IUseCase, IUserRepository } from '@domain/core';
import { UserEntity } from '@domain/entities';
import { Email } from '@domain/value-objects';

export type RegisterUserUseCaseOutput = Omit<
  RegisterUserUseCaseInput,
  'senha'
> & { id: string };
export type RegisterUserUseCaseInput = {
  nome: string;
  email: string;
  senha: string;
};

export type IRegisterUserUseCase = IUseCase<
  RegisterUserUseCaseInput,
  RegisterUserUseCaseOutput
>;
export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute({ nome, email, senha }: RegisterUserUseCaseInput) {
    if (await this.userRepository.exists(new Email(email))) {
      throw new UserAlreadyExistsException();
    }
    const userEntity = await UserEntity.create({
      nome,
      email,
      senha,
    });

    const saved = await this.userRepository.save(userEntity);
    const userProps = UserEntity.toPrimitives(saved);

    return {
      nome: userProps.nome,
      email: userProps.email,
      id: saved.id.value,
    };
  }
}
