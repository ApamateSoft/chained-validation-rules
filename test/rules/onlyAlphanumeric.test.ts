import { describe, expect, test } from '@jest/globals';
import { Validator, ValidatorBuilder } from '../../src';
import * as util from 'util';

describe('onlyAlphanumeric test', () => {
  const NOT_PERMIT = [null, undefined, '', '-', 'a*', '>text', 'a-', '-1.61', '$10,320.00', 'a b'];
  const PERMIT = ['0123456789aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ'];
  const MESSAGE = util.format(Validator.messages.onlyAlphanumericMessage);

  let validator: Validator, builder: Validator;

  beforeEach(() => {
    validator = new Validator();
    validator.onlyAlphanumeric();

    builder = new ValidatorBuilder().onlyAlphanumeric().build();
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
