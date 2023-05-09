import type { IUseCase, IClienteRepository } from '@domain/core';
import { Cliente } from '@domain/entities/cliente';
import { Email } from '@domain/value-objects';

import { ClienteAlreadyExistsException } from '@infra/exceptions';

export type RegistrarClienteUseCaseOutput = RegistrarClienteUseCaseInput & {
  id: string;
};
export interface RegistrarClienteUseCaseInput {
  nome: string;
  email?: string;
  telefone: string;
}

export type IRegistrarClienteUseCase = IUseCase<
  RegistrarClienteUseCaseInput,
  RegistrarClienteUseCaseOutput
>;
export class RegistrarClienteUseCase implements IRegistrarClienteUseCase {
  constructor(private readonly clienteRepository: IClienteRepository) {}

  async execute({
    nome,
    email,
    telefone,
  }: RegistrarClienteUseCaseInput): Promise<RegistrarClienteUseCaseOutput> {
    if (email && (await this.clienteRepository.exists(new Email(email)))) {
      throw new ClienteAlreadyExistsException();
    }
    const user = Cliente.create({
      nome,
      email,
      telefone,
    });

    const saved = await this.clienteRepository.save(user);

    return {
      id: saved.id.value,
      nome: saved.nome.value,
      email: saved.email?.value,
      telefone: saved.telefone,
    };
  }
}
