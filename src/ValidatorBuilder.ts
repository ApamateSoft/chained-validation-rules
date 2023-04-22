import Rule from './Rule';
import Validator from './Validator';

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
  rule(message: string, validate: (evaluate: string) => boolean): ValidatorBuilder {
    this.rules.push(new Rule(message, validate));
    return this;
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
