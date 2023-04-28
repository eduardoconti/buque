import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UserAuthUseCaseOutput } from '@app/use-cases';

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    if (ctx.getType() === 'http') {
      const request = ctx.switchToHttp().getRequest();
      return request.user as UserAuthUseCaseOutput;
    }
  },
);
