import type { IUseCase, IUserRepository } from '@domain/core';
import { Email, Senha } from '@domain/value-objects';

import { UnauthorizedException } from '@infra/exceptions';

export interface UserAuthUseCaseInput {
  userName: string;
  senha: string;
}

export interface UserAuthUseCaseOutput {
  userId: string;
  userName: string;
}

export type IUserAuthUseCase = IUseCase<
  UserAuthUseCaseInput,
  UserAuthUseCaseOutput
>;
export class UserAuthUseCase implements IUserAuthUseCase {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute({
    userName,
    senha,
  }: UserAuthUseCaseInput): Promise<UserAuthUseCaseOutput> {
    const user = await this.userRepository.findOne({
      email: new Email(userName),
    });

    if (!(await Senha.compareHash(senha, user.props.senha.value))) {
      throw new UnauthorizedException('invalid credentials');
    }
    return {
      userId: user.id.value,
      userName: user.props.nome.value,
    };
  }
}
