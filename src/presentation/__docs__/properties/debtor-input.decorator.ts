import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export const DebtorInputProperty = () => {
  return applyDecorators(
    ApiProperty({
      type: 'object',
      oneOf: [
        {
          required: ['nome', 'cpf'],
          properties: {
            nome: {
              type: 'string',
              example: 'Eduardo Conti',
            },
            cpf: {
              type: 'string',
              example: '50673646459',
              pattern: `^\d{11}$`,
            },
          },
        },
        {
          required: ['nome', 'cnpj'],
          properties: {
            nome: {
              type: 'string',
              example: 'Eduardo Conti',
            },
            cnpj: {
              type: 'string',
              example: '07439841000149',
              pattern: `^\d{14}$`,
            },
          },
        },
      ],
    }),
  );
};
