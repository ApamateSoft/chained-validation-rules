import { describe, expect, test } from '@jest/globals';
import { Validator, ValidatorBuilder } from '../../src';

describe('mustContainMin test', () => {
  const MIN = 3;
  const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
  const NOT_PERMIT = [null, undefined, '', 'ABC', '123', 'abC'];
  const PERMIT = ['abc', 'abcd', 'aBcDe', 'abcABC123...'];
  const MESSAGE = Validator.messages.mustContainMinMessage.replace('%min', String(MIN)).replace('%alphabet', ALPHABET);

  let validator: Validator, builder: Validator;

  beforeEach(() => {
    validator = new Validator();
    validator.mustContainMin(MIN, ALPHABET);
    builder = new ValidatorBuilder().mustContainMin(MIN, ALPHABET).build();
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
    expect(() => validator.validOrFail('')).toThrowError(MESSAGE);
  });

  test('throwInvalidEvaluationError_builder', () => {
    expect(() => builder.validOrFail('')).toThrowError(MESSAGE);
  });
});
