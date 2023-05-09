import { BaseException, Status } from '@domain/exceptions';

export class ClienteNotFoundException extends BaseException {
  readonly code = Status.INTERNAL_ERROR;
}
