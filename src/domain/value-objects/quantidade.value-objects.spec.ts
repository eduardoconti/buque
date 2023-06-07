import { ArgumentInvalidException } from '@domain/exceptions';

import { Quantidade } from './quantidade.value-object';

describe('Quantidade', () => {
  describe('constructor', () => {
    it('should create a new Quantidade object', () => {
      const amount = new Quantidade(100);
      expect(amount).toBeDefined();
      expect(amount.value).toBe(100);
    });
  });

  describe('validate', () => {
    it('should throw an exception if the value is not a positive integer', () => {
      expect(() => {
        new Quantidade(-100);
      }).toThrowError(ArgumentInvalidException);
      expect(() => {
        new Quantidade(123.45);
      }).toThrowError(ArgumentInvalidException);
      expect(() => {
        new Quantidade(NaN);
      }).toThrowError(ArgumentInvalidException);
    });
  });
});
