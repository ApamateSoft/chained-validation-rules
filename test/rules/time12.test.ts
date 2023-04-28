import { describe, expect, test } from '@jest/globals';
import { Validator, ValidatorBuilder } from '../../src';
import * as util from 'util';

describe('time12 test', () => {
  const NOT_PERMIT = [
    null,
    undefined,
    '',
    '1200',
    '01/01/2020',
    '12-30',
    '12.50',
    '25:00',
    '13:00 am',
    '23:59',
    '00:00',
    '23:59',
  ];
  const PERMIT = ['12:59 am', '1:00 pm', '01:00AM', '01:00pm'];
  const MESSAGE = util.format(Validator.messages.time12Message);

  let validator: Validator, builder: Validator;

  beforeEach(() => {
    validator = new Validator();
    validator.time12();

    builder = new ValidatorBuilder().time12().build();
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
