import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  //UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { IRegisterUserUseCase, RegisterUserUseCase } from '@app/use-cases';

//import { JwtAuthGuard } from '@infra/guard';

import {
  ApiInternalServerErrorResponse,
  ApiSuccessResponse,
} from '@presentation/__docs__';
import { RegisterUserInput } from '@presentation/dto';
import { RegisterUserOutput } from '@presentation/dto/register-user.output.dto';

@ApiTags('user')
@Controller('user')
// @UseGuards(JwtAuthGuard)
export class RegisterUserController {
  constructor(
    @Inject(RegisterUserUseCase)
    private readonly registerUserUseCase: IRegisterUserUseCase,
  ) {}

  @Post('')
  @ApiOperation({
    summary: 'Registra novo usuário',
    description: 'Rota para registrar um novo usuário',
  })
  @ApiSuccessResponse({
    model: RegisterUserOutput,
    statusCode: HttpStatus.CREATED,
  })
  @ApiInternalServerErrorResponse({
    title: 'UserRepositoryException',
    detail: 'database error',
  })
  @ApiBearerAuth()
  async handle(@Body() data: RegisterUserInput): Promise<RegisterUserOutput> {
    const { email, nome, id } = await this.registerUserUseCase.execute(
      RegisterUserInput.toUseCaseInput(data),
    );
    return { id, email, nome };
  }
}
