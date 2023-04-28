import { applyDecorators, HttpStatus } from '@nestjs/common';

import {
  ApiErrorResponse,
  ApiErrorResponseProps,
} from './api-error-response.decorator';

export const ApiInternalServerErrorResponse = (
  props: Omit<ApiErrorResponseProps, 'status'>,
) => {
  return applyDecorators(
    ApiErrorResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      title: props.title,
      detail: props.detail,
    }),
  );
};
