import { describe, expect, test } from '@jest/globals';
import { Validator, ValidatorBuilder } from '../../src';
import * as util from 'util';

describe('numberPattern test', () => {
  const CONDITION = '+xx (xxx) xxx-xx-xx';
  const NOT_PERMIT = [
    null,
    undefined,
    '',
    'example',
    '128',
    '+58 (412) 756-41-79 ',
    ' +58 (412) 756-41-79',
    '+a8 (412) 756-41-79',
  ];
  const PERMIT = ['+58 (412) 756-41-79', '+xx (xxx) xxx-xx-xx'];
  const MESSAGE = util.format(Validator.messages.numberPatternMessage, CONDITION);

  let validator: Validator, builder: Validator;

  beforeEach(() => {
    validator = new Validator();
    validator.numberPattern(CONDITION);

    builder = new ValidatorBuilder().numberPattern(CONDITION).build();
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
