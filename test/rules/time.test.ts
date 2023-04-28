import { describe, expect, test } from '@jest/globals';
import { Validator, ValidatorBuilder } from '../../src';
import * as util from 'util';

describe('time test', () => {
  const NOT_PERMIT = [null, undefined, '', '1200', '01/01/2020', '12-30', '12.50', '25:00', '13:00 am'];
  const PERMIT = ['00:00', '12:30', '12:59 am', '23:59', '1:00 pm', '01:00AM', '01:00pm', '01:00PM'];
  const MESSAGE = util.format(Validator.messages.timeMessage);

  let validator: Validator, builder: Validator;

  beforeEach(() => {
    validator = new Validator();
    validator.time();

    builder = new ValidatorBuilder().time().build();
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
