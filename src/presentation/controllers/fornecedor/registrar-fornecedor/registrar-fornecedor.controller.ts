import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  IRegistrarFornecedorUseCase,
  RegistrarFornecedorUseCase,
} from '@app/use-cases/fornecedor';

import { JwtAuthGuard } from '@infra/guard';

import {
  ApiInternalServerErrorResponse,
  ApiSuccessResponse,
} from '@presentation/__docs__';

import { RegistrarFornecedorInput, RegistrarFornecedorOutput } from './dto';

@ApiTags('fornecedor')
@Controller('fornecedor')
@UseGuards(JwtAuthGuard)
export class RegistrarFornecedorController {
  constructor(
    @Inject(RegistrarFornecedorUseCase)
    private readonly registrarFornecedorUseCase: IRegistrarFornecedorUseCase,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Registrar fornecedor',
    description: 'Rota para registrar um fornecedor',
  })
  @ApiSuccessResponse({
    model: RegistrarFornecedorOutput,
    statusCode: HttpStatus.CREATED,
  })
  @ApiInternalServerErrorResponse({
    title: 'FornecedorRepositoryException',
    detail: 'database error',
  })
  @ApiBearerAuth()
  async handle(
    @Body() data: RegistrarFornecedorInput,
  ): Promise<RegistrarFornecedorOutput> {
    const usecaseOutput = await this.registrarFornecedorUseCase.execute(
      RegistrarFornecedorInput.toUseCaseInput(data),
    );
    return RegistrarFornecedorOutput.fromUseCaseOutput(usecaseOutput);
  }
}
