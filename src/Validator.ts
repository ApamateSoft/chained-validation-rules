import Rule from './Rule';
import InvalidEvaluationError from './exceptions/InvalidEvaluationError';
import Messages from './messages/Messages';
import messagesEn from './messages/MessagesEn';

/**
 * <h1>Chained validation rules</h1>
 *
 * Facilitates the validation of strings by chaining a series of rules
 *
 * @author ApamateSoft
 * @version 0.0.6
 */
export default class Validator {
  public static messages: Messages = messagesEn;

  /**
   * Event that is invoked when some rule is not fulfilled
   */
  onInvalidEvaluation?: (message: string) => void;
  /**
   * Error message to display, in case the string comparison fails
   */
  public notMatchMessage = Validator.messages.compareMessage;

  constructor(private readonly rules: Rule[] = []) {}

  /**
   * Validate that the string to evaluate meets all the rules <br>
   * <b>Note:</b> If the string does not meet any rule, the {@link onInvalidEvaluation} event will be invoked with the
   * corresponding error message
   * @param evaluate string to evaluate
   * @return true: if validation passes
   */
  isValid(evaluate: string): boolean {
    for (const rule of this.rules) {
      if (!rule.validate(evaluate)) {
        this.onInvalidEvaluation?.(rule.message);
        return false;
      }
    }
    return true;
  }

  /**
   * Validate that both strings match and that they meet all the rules <br/>
   * <b>Note:</b>
   * <ul>
   *     <li>
   *         If the strings do not comply with some rules, the onNotPass {@link onInvalidEvaluation} event will be
   *         invoked, with the corresponding error message.
   *     </li>
   *     <li>
   *        An error message can be set in case the comparison fails with the {@link notMatchMessage} method.
   *     </li>
   * <ul/>
   * @param evaluate string to evaluate
   * @param compare string to compare
   * @return true: if validation passes
   */
  isMatch(evaluate: string, compare: string): boolean {
    if (evaluate !== compare) {
      this.onInvalidEvaluation?.(this.notMatchMessage);
    }
    return this.isValid(evaluate);
  }

  /**
   * Validate that the string to evaluate meets all the rules
   * @param evaluate string to evaluate
   * @throws InvalidEvaluationError Exception thrown if the string to evaluate does not meet any rule
   */
  validOrFail(evaluate: string) {
    for (const rule of this.rules)
      if (!rule.validate(evaluate)) throw new InvalidEvaluationError(rule.message, evaluate);
  }

  /**
   * Validate that both strings match and that they meet all the rules <br/>
   * <b>Note:</b>
   * <ul>
   *     <li>
   *         If the strings do not comply with some rules, the onNotPass {@link onInvalidEvaluation} event will be
   *         invoked, with the corresponding error message.
   *     </li>
   *     <li>
   *        An error message can be set in case the comparison fails with the {@link notMatchMessage} method.
   *     </li>
   * <ul/>
   * @param evaluate string to evaluate
   * @param compare string to compare
   * @throws InvalidEvaluationError Exception thrown if the string to evaluate does not meet any rule
   */
  compareOrFail(evaluate: string, compare: string) {
    if (evaluate !== compare) throw new InvalidEvaluationError(this.notMatchMessage, evaluate);
    this.validOrFail(evaluate);
  }

  /**
   * Create a validation rule <br/>
   * <b>Example:<b/>
   * <pre>
   * new Validator.rule("Enter a text other than null", (evaluate: string) => string != null );
   * </pre>
   * @param message Error message
   * @param validate Function that returns true when the string to evaluate meets the conditions
   */
  rule(message: string, validate: (evaluate: string) => boolean) {
    this.rules.push(new Rule(message, validate));
  }

  /**
   * Create a copy of the Validator object
   * @return copy of Validator
   */
  copy(): Validator {
    const validator = new Validator(this.rules);
    validator.notMatchMessage = this.notMatchMessage;
    validator.onInvalidEvaluation = this.onInvalidEvaluation;
    return validator;
  }
}
