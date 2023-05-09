import { describe, expect, test } from '@jest/globals';
import { Validator, ValidatorBuilder } from '../../src';

describe('ipv6 test', () => {
  const NOT_PERMIT = [
    null,
    undefined,
    '',
    'text',
    '128',
    '10.0.0.256',
    '10.0.0.0.1',
    '127.0.0.1',
    '192.168.0.109',
    '10.0.0.1',
    'ffff::ffff::ffff',
    'fffff::ffff',
    'fffg::ffff',
  ];
  const PERMIT = ['ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff', 'ffff::', 'ffff::ffff', 'ffff:ffff::ffff'];
  const MESSAGE = Validator.messages.ipv6Message;

  let validator: Validator, builder: Validator;

  beforeEach(() => {
    validator = new Validator();
    validator.ipv6();

    builder = new ValidatorBuilder().ipv6().build();
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
