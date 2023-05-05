import { ArgumentInvalidException } from '@domain/exceptions';

import { Nome } from './nome.value-object';

describe('Nome', () => {
  describe('constructor', () => {
    it('should create a new Nome object', async () => {
      const nome = new Nome('Eduardo Conti');
      expect(nome).toBeDefined();
      expect(nome.value).toBeDefined();
      expect(Nome.isValueObject(nome)).toBeTruthy;
    });
  });
  describe('validate', () => {
    it('should throw ArgumentInvalidException if nome not be greater than 2 chars', () => {
      expect(() => {
        new Nome('EA');
      }).toThrowError(ArgumentInvalidException);
      expect(() => {
        new Nome('');
      }).toThrowError(ArgumentInvalidException);
    });

    it('should throw ArgumentInvalidException if nome not less than 100 chars', () => {
      expect(() => {
        new Nome(
          'ASDDDDASDASDASDASDASDASDASDASDASASDASDASDASDADAS ASDASDADASDASDSAD ASDASDASDASDASDASD ASDDDDASDASDASDASDASDASDASD',
        );
      }).toThrowError(ArgumentInvalidException);
      expect(() => {
        new Nome('');
      }).toThrowError(ArgumentInvalidException);
    });
  });
});
