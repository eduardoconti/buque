import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { UserAuthUseCaseOutput } from '@app/use-cases';

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    if (ctx.getType() === 'http') {
      const request = ctx.switchToHttp().getRequest<Request>();
      return request.user as UserAuthUseCaseOutput;
    }
  },
);
