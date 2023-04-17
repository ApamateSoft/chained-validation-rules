import {describe, expect, test} from '@jest/globals';
import ValidatorBuilder from "../src/ValidatorBuilder";

describe('sum module', () => {

  test('adds 1 + 2 to equal 3', () => {

    const validator = new ValidatorBuilder()
      .rule('Hola mundo', evaluate => evaluate.length > 0)
      .addOnInvalidEvaluation( message => console.log(message) )
      .build();
    validator.isValid('')

    // const validator = new Validator();
    // validator.rule('Hola mundo', evaluate => evaluate.length > 0 );
    // validator.addOnInvalidEvaluation(message => console.log(message));
    // validator.isValid('');

    expect(3).toBe(3);
  });

});