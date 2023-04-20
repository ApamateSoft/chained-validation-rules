import {describe, expect, test} from '@jest/globals';
import ValidatorBuilder from "../src/ValidatorBuilder";

describe('Rule function test', () => {

  test('The onInvalidEvaluation event must be executed if the validation is not met', () => {

    const errorMessage = 'error message';
    const evaluate = '';

    const validate = (evaluate: string) => evaluate.length > 0;

    const handleInvalidEvaluation = jest.fn( (message: string) => {} )

    const validator = new ValidatorBuilder()
      .rule(errorMessage, validate)
      .addOnInvalidEvaluation(handleInvalidEvaluation)
      .build();
    validator.isValid(evaluate);

    expect(handleInvalidEvaluation).toHaveBeenCalled()
  });

  test('The onInvalidEvaluation event should not be executed if the validation is fulfilled', () => {

    const errorMessage = 'error message';
    const evaluate = 'a';

    const validate = (evaluate: string) => evaluate.length > 0;

    const handleInvalidEvaluation = jest.fn( (message: string) => {} )

    const validator = new ValidatorBuilder()
      .rule(errorMessage, validate)
      .addOnInvalidEvaluation(handleInvalidEvaluation)
      .build();
    validator.isValid(evaluate);

    expect(handleInvalidEvaluation).not.toHaveBeenCalled()
  });

});