import { describe, expect, test } from '@jest/globals';
import { Validator, ValidatorBuilder } from '../../src';
import * as util from 'util';

describe('name test', () => {
  const NOT_PERMIT = [null, undefined, '', '10', '1jose', '@omar', 'Jesús', 'jesus 1alberto', ' jesus', 'jesus '];
  const PERMIT = ['jesus', 'maria', 'JOSE', 'jesus maria', 'Maria Jose', 'Jose Jesus', 'maria de jose'];
  const MESSAGE = util.format(Validator.messages.nameMessage);

  let validator: Validator, builder: Validator;

  beforeEach(() => {
    validator = new Validator();
    validator.name();

    builder = new ValidatorBuilder().name().build();
  });

  test('notPermit', () => {
    const result = NOT_PERMIT.every((eva) => !validator.isValid(eva));
    expect(result).toBe(true);
  });

  test('Permit', () => {
    const result = PERMIT.every((eva) => validator.isValid(eva));
    expect(result).toBe(true);
  });

  test('notPermit_builder', () => {
    const result = NOT_PERMIT.every((eva) => !builder.isValid(eva));
    expect(result).toBe(true);
  });

  test('Permit_builder', () => {
    const result = PERMIT.every((eva) => builder.isValid(eva));
    expect(result).toBe(true);
  });

  test('verifyCallback', () => {
    const onInvalidEvaluation = jest.fn((message: string) => expect(MESSAGE).toBe(message));
    validator.onInvalidEvaluation = onInvalidEvaluation;
    validator.isValid();
    expect(onInvalidEvaluation).toHaveBeenCalled();
  });

  test('verifyCallback_builder', () => {
    const onInvalidEvaluation = jest.fn((message: string) => expect(MESSAGE).toBe(message));
    builder.onInvalidEvaluation = onInvalidEvaluation;
    builder.isValid();
    expect(onInvalidEvaluation).toHaveBeenCalled();
  });

  test('throwInvalidEvaluationError', () => {
    expect(() => validator.validOrFail('param')).toThrowError(MESSAGE);
  });

  test('throwInvalidEvaluationError_builder', () => {
    expect(() => builder.validOrFail('param')).toThrowError(MESSAGE);
  });
});
