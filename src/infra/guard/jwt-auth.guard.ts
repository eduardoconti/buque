import type { ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Observable } from 'rxjs';

import {
  InvalidTokenException,
  TokenExpiredException,
  UnauthorizedException,
} from '@infra/exceptions';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<D>(
    _err: Error,
    user: D,
    info?: { nome: string },
  ): NonNullable<D> {
    if (info) {
      const { nome } = info;
      switch (nome) {
        case 'JsonWebTokenError':
          throw new InvalidTokenException();
        case 'TokenExpiredError':
          throw new TokenExpiredException();
        case 'NotBeforeError':
          throw new UnauthorizedException();
      }
    }

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
