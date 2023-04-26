import Rule from './Rule';
import Validator from './Validator';
import { email, maxLength, minLength, re, required, textLength } from './utils/validators';
import * as util from 'util';

export default class ValidatorBuilder {
  constructor(
    private readonly rules: Rule[] = [],
    private onInvalidEvaluation?: (message: string) => void,
    private notMatchMessage = Validator.messages.compareMessage,
  ) {}

  /**
   * Add event that is invoked when some rule is not fulfilled
   * @param onInvalidEvaluation Function with the error message
   * @return ValidatorBuilder
   */
  addOnInvalidEvaluation(onInvalidEvaluation: (message: string) => void): ValidatorBuilder {
    this.onInvalidEvaluation = onInvalidEvaluation;
    return this;
  }

  /**
   * Sets the error message to display, in case the string comparison fails in the method {@link isMatch}
   * @param message Error message
   * @return ValidatorBuilder
   */
  setNotMatchMessage(notMatchMessage: string): ValidatorBuilder {
    this.notMatchMessage = notMatchMessage;
    return this;
  }

  /**
   * Create a validation rule <br/>
   * <b>Example:<b/>
   * <pre>
   * new Validator.rule("Enter a text other than null", (evaluate: string) => string != null );
   * </pre>
   * @param message Error message
   * @param validate Function that returns true when the string to evaluate meets the conditions
   * @return ValidatorBuilder
   */
  rule(message: string, validate: (evaluate?: string | null) => boolean): ValidatorBuilder {
    this.rules.push(new Rule(message, validate));
    return this;
  }

  /**
   * Validates that the string is different from null and empty
   * @param message
   * @return ValidatorBuilder
   */
  required(message: string = Validator.messages.requiredMessage): ValidatorBuilder {
    return this.rule(message, required);
  }

  /**
   * Validates that the string has an exact length of characters
   * @param length character length
   * @param message Error message
   * @return ValidatorBuilder
   */
  textLength(length: number, message: string = Validator.messages.textLengthMessage): ValidatorBuilder {
    return this.rule(util.format(message, length), (eva) => textLength(length, eva));
  }

  /**
   * Validates that the length of the string is not less than the min
   * @param min Minimum character length
   * @param message Error message
   * @return ValidatorBuilder
   */
  minLength(min: number, message: string = Validator.messages.minLengthMessage): ValidatorBuilder {
    return this.rule(util.format(message, min), (eva) => minLength(min, eva));
  }

  /**
   * Validates that the length of the String is not greater than the max
   * @param max Maximum character length
   * @param message Error message
   * @return ValidatorBuilder
   */
  maxLength(max: number, message: string = Validator.messages.maxLengthMessage): ValidatorBuilder {
    return this.rule(util.format(message, max), (eva) => maxLength(max, eva));
  }

  /**
   * Validates that the string matches the regular expression
   * @param regExp Regular expression
   * @param message Error message
   * @return ValidatorBuilder
   */
  re(regExp: string, message: string = Validator.messages.reMessage): ValidatorBuilder {
    return this.rule(util.format(message, regExp), (eva) => re(regExp, eva));
  }

  /**
   * Validates that the string has an email format
   * @param message Error message
   * @return ValidatorBuilder
   */
  email(message: string = Validator.messages.emailMessage): ValidatorBuilder {
    return this.rule(message, email);
  }

  /**
   * Build the Validator
   * @return Validator
   */
  build(): Validator {
    const validator = new Validator(this.rules);
    validator.notMatchMessage = this.notMatchMessage;
    validator.onInvalidEvaluation = this.onInvalidEvaluation;
    return validator;
  }
}
