import { describe, expect, test } from '@jest/globals';
import { InvalidEvaluationError, MessagesEn, Validator, ValidatorBuilder } from '../src';

const validate = (evaluate: string) => evaluate.length > 0;
const errorMessage = 'error message';

describe('Simple validator test', () => {
  test('The onInvalidEvaluation event must be executed if the validation is not met', () => {
    const evaluate = '';
    const handleInvalidEvaluation = jest.fn((message: string) => {});
    const validator = new Validator();
    validator.rule(errorMessage, validate);
    validator.onInvalidEvaluation = handleInvalidEvaluation;
    validator.isValid(evaluate);
    expect(handleInvalidEvaluation).toHaveBeenCalled();
  });

  test('The onInvalidEvaluation event should not be executed if the validation is fulfilled', () => {
    const evaluate = 'a';
    const handleInvalidEvaluation = jest.fn((message: string) => {});
    const validator = new Validator();
    validator.rule(errorMessage, validate);
    validator.onInvalidEvaluation = handleInvalidEvaluation;
    validator.isValid(evaluate);
    expect(handleInvalidEvaluation).not.toHaveBeenCalled();
  });

  test('The onInvalidEvaluation event must be executed if not match', () => {
    const evaluate = 'a';
    const compare = 'b';
    const handleInvalidEvaluation = jest.fn((message: string) => {});
    const validator = new Validator();
    validator.rule(errorMessage, validate);
    validator.onInvalidEvaluation = handleInvalidEvaluation;
    validator.isMatch(evaluate, compare);
    expect(handleInvalidEvaluation).toHaveBeenCalled();
  });

  test('The onInvalidEvaluation event should not be executed if match', () => {
    const evaluate = 'a';
    const compare = 'a';
    const handleInvalidEvaluation = jest.fn((message: string) => {});
    const validator = new Validator();
    validator.rule(errorMessage, validate);
    validator.onInvalidEvaluation = handleInvalidEvaluation;
    validator.isMatch(evaluate, compare);
    expect(handleInvalidEvaluation).not.toHaveBeenCalled();
  });

  test('Test validOrFail function', () => {
    const evaluate = '';
    const handleInvalidEvaluation = jest.fn((message: string) => {});
    const validator = new Validator();
    validator.rule(errorMessage, validate);
    validator.onInvalidEvaluation = handleInvalidEvaluation;
    expect(() => validator.validOrFail(evaluate)).toThrowError(errorMessage);
  });

  test('Test compareOrFail function', () => {
    const evaluate = 'a';
    const compare = 'b';
    const handleInvalidEvaluation = jest.fn((message: string) => {});
    const validator = new Validator();
    validator.rule(errorMessage, validate);
    validator.onInvalidEvaluation = handleInvalidEvaluation;
    expect(() => validator.compareOrFail(evaluate, compare)).toThrowError(Validator.messages.compareMessage);
  });
});

describe('ValidatorBuilder test', () => {
  test('The onInvalidEvaluation event must be executed if the validation is not met', () => {
    const evaluate = '';
    const handleInvalidEvaluation = jest.fn((message: string) => {});
    const validator = new ValidatorBuilder()
      .rule(errorMessage, validate)
      .addOnInvalidEvaluation(handleInvalidEvaluation)
      .build();
    validator.isValid(evaluate);
    expect(handleInvalidEvaluation).toHaveBeenCalled();
  });

  test('The onInvalidEvaluation event should not be executed if the validation is fulfilled', () => {
    const evaluate = 'a';
    const handleInvalidEvaluation = jest.fn((message: string) => {});
    const validator = new ValidatorBuilder()
      .rule(errorMessage, validate)
      .addOnInvalidEvaluation(handleInvalidEvaluation)
      .build();
    validator.isValid(evaluate);
    expect(handleInvalidEvaluation).not.toHaveBeenCalled();
  });
});

describe('Copy validator test', () => {
  test('The onInvalidEvaluation event must be executed if the validation is not met', () => {
    const evaluate = '';
    const handleInvalidEvaluation = jest.fn((message: string) => {});
    const validator = new Validator();
    validator.rule(errorMessage, validate);
    const copy = validator.copy();
    copy.onInvalidEvaluation = handleInvalidEvaluation;
    copy.isValid(evaluate);
    expect(handleInvalidEvaluation).toHaveBeenCalled();
  });

  test('The onInvalidEvaluation event should not be executed if the validation is fulfilled', () => {
    const evaluate = 'a';
    const handleInvalidEvaluation = jest.fn((message: string) => {});
    const validator = new Validator();
    validator.rule(errorMessage, validate);
    const copy = validator.copy();
    copy.onInvalidEvaluation = handleInvalidEvaluation;
    copy.isValid(evaluate);
    expect(handleInvalidEvaluation).not.toHaveBeenCalled();
  });
});
