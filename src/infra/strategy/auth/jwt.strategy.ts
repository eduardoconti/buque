import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import type { TokenPayload } from '@app/contracts';
import type { UserAuthUseCaseOutput } from '@app/use-cases';

import type { EnvironmentVariables } from '@main/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      secretOrKeyProvider: (_request: unknown, _token: unknown, done: any) => {
        const secret = this.configService.getOrThrow<string>('JWT_KEY');
        done(null, secret);
      },
    });
  }

  validate({ userId, userName }: UserAuthUseCaseOutput): TokenPayload {
    return {
      userName,
      userId,
    };
  }
}
