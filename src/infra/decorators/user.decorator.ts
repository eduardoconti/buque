import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import type { Request } from 'express';

import type { UserAuthUseCaseOutput } from '@app/use-cases';

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    if (ctx.getType() === 'http') {
      const request = ctx.switchToHttp().getRequest<Request>();
      return request.user as UserAuthUseCaseOutput;
    }
  },
);
