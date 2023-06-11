import { BaseException, Status } from '@domain/exceptions';

export class MateriaPrimaNotFoundException extends BaseException {
  readonly code = Status.NOT_FOUND;
}
