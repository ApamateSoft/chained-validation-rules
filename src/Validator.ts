import Rule from './Rule';
import InvalidEvaluationError from './exceptions/InvalidEvaluationError';
import Messages from './messages/Messages';
import messagesEn from './messages/MessagesEn';
import {
  email,
  httpLink,
  ip,
  ipv4,
  ipv6,
  link,
  maxLength,
  minLength,
  number,
  rangeLength,
  re,
  required,
  textLength,
  wwwLink,
  name,
  httpsLink,
  time,
  time12,
  time24,
  onlyNumbers,
  onlyLetters,
  onlyAlphanumeric,
} from './utils/validators';
import * as util from 'util';

/**
 * <h1>Chained validation rules</h1>
 *
 * Facilitates the validation of strings by chaining a series of rules
 *
 * @author ApamateSoft
 * @version 0.0.7
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
  isValid(evaluate?: string | null): boolean {
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
  isMatch(evaluate?: string | null, compare?: string | null): boolean {
    if (evaluate !== compare) this.onInvalidEvaluation?.(this.notMatchMessage);
    return this.isValid(evaluate);
  }

  /**
   * Validate that the string to evaluate meets all the rules
   * @param evaluate string to evaluate
   * @throws InvalidEvaluationError Exception thrown if the string to evaluate does not meet any rule
   */
  validOrFail(evaluate?: string | null) {
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
  compareOrFail(evaluate?: string | null, compare?: string | null) {
    if (evaluate !== compare) throw new InvalidEvaluationError(this.notMatchMessage, evaluate);
    this.validOrFail(evaluate);
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

  /**
   * Create a validation rule <br/>
   * <b>Example:<b/>
   * <pre>
   * new Validator.rule("Enter a text other than null", (evaluate: string) => string != null );
   * </pre>
   * @param message Error message
   * @param validate Function that returns true when the string to evaluate meets the conditions
   */
  rule(message: string, validate: (evaluate?: string | null) => boolean) {
    this.rules.push(new Rule(message, validate));
  }

  /**
   * Validates that the string is different from null and empty
   * @param message
   */
  required(message: string = Validator.messages.requiredMessage) {
    this.rule(message, required);
  }

  /**
   * Validates that the string has an exact length of characters
   * @param length character length
   * @param message Error message
   */
  textLength(length: number, message: string = Validator.messages.textLengthMessage) {
    this.rule(util.format(message, length), (eva) => textLength(length, eva));
  }

  /**
   * Validates that the length of the string is not less than the min
   * @param min Minimum character length
   * @param message Error message
   */
  minLength(min: number, message: string = Validator.messages.minLengthMessage) {
    this.rule(util.format(message, min), (eva) => minLength(min, eva));
  }

  /**
   * Validates that the length of the string is not greater than the max
   * @param max Maximum character length
   * @param message Error message
   */
  maxLength(max: number, message: string = Validator.messages.maxLengthMessage) {
    this.rule(util.format(message, max), (eva) => maxLength(max, eva));
  }

  /**
   * Validates that the length of the string is in the established range
   * @param min Minimum character length
   * @param max Maximum character length
   * @param message Error message
   */
  rangeLength(min: number, max: number, message: string = Validator.messages.rangeLengthMessage) {
    this.rule(util.format(message, min, max), (eva) => rangeLength(min, max, eva));
  }

  /**
   * Validates that the string matches the regular expression
   * @param regExp Regular expression
   * @param message Error message
   */
  re(regExp: string, message: string = Validator.messages.reMessage) {
    this.rule(util.format(message, regExp), (eva) => re(regExp, eva));
  }

  /**
   * Validates that the string has an email format
   * @param message Error message
   */
  email(message: string = Validator.messages.emailMessage) {
    this.rule(message, email);
  }

  /**
   * Validates that the string is a numeric format <br/>
   * <b>Note:</b> This includes so many integers, decimal, and negative values
   * @param message Error message
   */
  number(message: string = Validator.messages.numberMessage) {
    this.rule(message, number);
  }

  /**
   * Validates that the string is a link format
   * @param message Error message
   */
  link(message: string = Validator.messages.linkMessage) {
    this.rule(message, link);
  }

  /**
   * Validates that the string is a link with www format
   * @param message Error message
   */
  wwwLink(message: string = Validator.messages.wwwLinkMessage) {
    this.rule(message, wwwLink);
  }

  /**
   * Validates that the string is a link with http format
   * @param message Error message
   */
  httpLink(message: string = Validator.messages.httpLinkMessage) {
    this.rule(message, httpLink);
  }

  /**
   * Validates that the string is a link with https format
   * @param message Error message
   */
  httpsLink(message: string = Validator.messages.httpsLinkMessage) {
    this.rule(message, httpsLink);
  }

  /**
   * Validates that the string is an ip format
   * @param message Error message
   */
  ip(message: string = Validator.messages.ipMessage) {
    this.rule(message, ip);
  }

  /**
   * Validates that the string is an ipv4 format
   * @param message Error message
   */
  ipv4(message: string = Validator.messages.ipv4Message) {
    this.rule(message, ipv4);
  }

  /**
   * Validates that the string is an ipv6 format
   * @param message Error message
   */
  ipv6(message: string = Validator.messages.ipv6Message) {
    this.rule(message, ipv6);
  }

  /**
   * Validates that the string is a proper name <br/>
   * <b>Note:</b>
   * <ul>
   *     <li>Capitalization is ignored</li>
   *     <li>
   *         Only valid proper names in English. to evaluate names in other languages it is recommended to use the
   *         {@link re()} function
   *     </li>
   * <ul/>
   * @param message Error message
   */
  name(message: string = Validator.messages.nameMessage) {
    this.rule(message, name);
  }

  /**
   * Validates that the string is a time format
   * @param message Error message
   */
  time(message: string = Validator.messages.timeMessage) {
    this.rule(message, time);
  }

  /**
   * Validates that the string is a time with 12-hour format
   * @param message Error message
   */
  time12(message: string = Validator.messages.time12Message) {
    this.rule(message, time12);
  }

  /**
   * Validate that the string is a time with 24 hours format
   * @param message Error message
   */
  time24(message: string = Validator.messages.time24Message) {
    this.rule(message, time24);
  }

  /**
   * Validates that the string to evaluate only contains numeric characters
   * @param message Error message
   */
  onlyNumbers(message: string = Validator.messages.onlyNumbersMessage) {
    this.rule(message, onlyNumbers);
  }

  /**
   * Validates that the string contains only letters <br />
   * <b>Note:</b> It only recognizes letters of the English alphabet
   * @param message Error message
   */
  onlyLetters(message: string = Validator.messages.onlyLettersMessage) {
    this.rule(message, onlyLetters);
  }

  /**
   * Validates that the string contains only alphanumeric characters <br />
   * <b>Note:</b> It only recognizes letters of the English alphabet
   * @param message Error message
   */
  onlyAlphanumeric(message: string = Validator.messages.onlyAlphanumericMessage) {
    this.rule(message, onlyAlphanumeric);
  }
}
