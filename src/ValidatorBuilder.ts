import Rule from './Rule';
import Validator from './Validator';
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
  notContain,
  shouldOnlyContain,
  mustContainOne,
  mustContainMin,
  minValue,
  maxValue,
  rangeValue,
  numberPattern,
} from './utils/validators';
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
   * @param notMatchMessage Error message
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
   * Validates that the length of the string is in the established range
   * @param min Minimum character length
   * @param max Maximum character length
   * @param message Error message
   * @return ValidatorBuilder
   */
  rangeLength(min: number, max: number, message: string = Validator.messages.rangeLengthMessage): ValidatorBuilder {
    return this.rule(util.format(message, min, max), (eva) => rangeLength(min, max, eva));
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
   * Validates that the string is a numeric format <br/>
   * <b>Note:</b> This includes so many integers, decimal, and negative values
   * @param message Error message
   * @return ValidatorBuilder
   */
  number(message: string = Validator.messages.numberMessage): ValidatorBuilder {
    return this.rule(message, number);
  }

  /**
   * Validates that the string is a link format
   * @param message Error message
   * @return ValidatorBuilder
   */
  link(message: string = Validator.messages.linkMessage): ValidatorBuilder {
    return this.rule(message, link);
  }

  /**
   * Validates that the string is a link with www format
   * @return ValidatorBuilder
   * @param message Error message
   */
  wwwLink(message: string = Validator.messages.wwwLinkMessage): ValidatorBuilder {
    return this.rule(message, wwwLink);
  }

  /**
   * Validates that the string is a link with http format
   * @param message Error message
   * @return ValidatorBuilder
   */
  httpLink(message: string = Validator.messages.httpLinkMessage): ValidatorBuilder {
    return this.rule(message, httpLink);
  }

  /**
   * Validates that the string is a link with https format
   * @param message Error message
   * @return ValidatorBuilder
   */
  httpsLink(message: string = Validator.messages.httpsLinkMessage): ValidatorBuilder {
    return this.rule(message, httpsLink);
  }

  /**
   * Validates that the string is an ip format
   * @param message Error message
   * @return ValidatorBuilder
   */
  ip(message: string = Validator.messages.ipMessage): ValidatorBuilder {
    return this.rule(message, ip);
  }

  /**
   * Validates that the string is an ipv4 format
   * @param message Error message
   * @return ValidatorBuilder
   */
  ipv4(message: string = Validator.messages.ipv4Message): ValidatorBuilder {
    return this.rule(message, ipv4);
  }

  /**
   * Validates that the string is an ipv6 format
   * @param message Error message
   * @return ValidatorBuilder
   */
  ipv6(message: string = Validator.messages.ipv6Message): ValidatorBuilder {
    return this.rule(message, ipv6);
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
   * @return ValidatorBuilder
   */
  name(message: string = Validator.messages.nameMessage): ValidatorBuilder {
    return this.rule(message, name);
  }

  /**
   * Validates that the string is a time format
   * @param message Error message
   * @return ValidatorBuilder
   */
  time(message: string = Validator.messages.timeMessage): ValidatorBuilder {
    return this.rule(message, time);
  }

  /**
   * Validates that the string is a time with 12-hour format
   * @param message Error message
   * @return ValidatorBuilder
   */
  time12(message: string = Validator.messages.time12Message): ValidatorBuilder {
    return this.rule(message, time12);
  }

  /**
   * Validate that the string is a time with 24 hours format
   * @param message Error message
   * @return ValidatorBuilder
   */
  time24(message: string = Validator.messages.time24Message): ValidatorBuilder {
    return this.rule(message, time24);
  }

  /**
   * Validates that the string to evaluate only contains numeric characters
   * @param message Error message
   * @return ValidatorBuilder
   */
  onlyNumbers(message: string = Validator.messages.onlyNumbersMessage): ValidatorBuilder {
    return this.rule(message, onlyNumbers);
  }

  /**
   * Validates that the string contains only letters <br />
   * <b>Note:</b> It only recognizes letters of the English alphabet
   * @param message Error message
   * @return ValidatorBuilder
   */
  onlyLetters(message: string = Validator.messages.onlyLettersMessage): ValidatorBuilder {
    return this.rule(message, onlyLetters);
  }

  /**
   * Validates that the string contains only alphanumeric characters <br />
   * <b>Note:</b> It only recognizes letters of the English alphabet
   * @param message Error message
   * @return ValidatorBuilder
   */
  onlyAlphanumeric(message: string = Validator.messages.onlyAlphanumericMessage): ValidatorBuilder {
    return this.rule(message, onlyAlphanumeric);
  }

  /**
   * Validates that the string does not contain any characters included in the alphabet
   * @param alphabet string with invalid characters
   * @param message Error message
   * @return ValidatorBuilder
   */
  notContain(alphabet: string, message: string = Validator.messages.notContainMessage): ValidatorBuilder {
    return this.rule(util.format(message, alphabet), (eva) => notContain(alphabet, eva));
  }

  /**
   * Validates that the string only contains characters included in the alphabet
   * @param alphabet string with allowed characters
   * @param message  Error message
   * @return ValidatorBuilder
   */
  shouldOnlyContain(alphabet: string, message: string = Validator.messages.shouldOnlyContainMessage): ValidatorBuilder {
    return this.rule(util.format(message, alphabet), (eva) => shouldOnlyContain(alphabet, eva));
  }

  /**
   * Validates that the string contains at least one character included in the alphabet
   * @param alphabet string with desired characters
   * @param message Error message
   * @return ValidatorBuilder
   */
  mustContainOne(alphabet: string, message: string = Validator.messages.mustContainOneMessage): ValidatorBuilder {
    return this.rule(util.format(message, alphabet), (eva) => mustContainOne(alphabet, eva));
  }

  /**
   * Validates that the string contains at least a minimum number of characters included in the alphabet
   * @param min minimum value
   * @param alphabet string with desired characters
   * @param message Error message
   * @return ValidatorBuilder
   */
  mustContainMin(
    min: number,
    alphabet: string,
    message: string = Validator.messages.mustContainMinMessage,
  ): ValidatorBuilder {
    return this.rule(util.format(message, min, alphabet), (eva) => mustContainMin(min, alphabet, eva));
  }

  /**
   * Validates that the value of the string is not less than the condition <br />
   * <b>Note:</b> It is recommended to implement the {@link number} rule first
   * @param min Minimum value
   * @param message Error message
   * @return ValidatorBuilder
   */
  minValue(min: number, message: string = Validator.messages.minValueMessage): ValidatorBuilder {
    return this.rule(util.format(message, min), (eva) => minValue(min, eva));
  }

  /**
   * Validates that the value of the string is not greater than the max <br />
   * <b>Note:</b> It is recommended to implement the {@link number} rule first
   * @param max Maximum value
   * @param message Error message
   * @return ValidatorBuilder
   */
  maxValue(max: number, message: string = Validator.messages.maxValueMessage): ValidatorBuilder {
    return this.rule(util.format(message, max), (eva) => maxValue(max, eva));
  }

  /**
   * Validates that the value of the string is in the established range <br />
   * <b>Note:</b> It is recommended to implement the {@link number} rule first
   * @param min Minimum value
   * @param max Maximum value
   * @param message Error message
   * @return ValidatorBuilder
   */
  rangeValue(min: number, max: number, message: string = Validator.messages.rangeValueMessage): ValidatorBuilder {
    return this.rule(util.format(message, min, max), (eva) => rangeValue(min, max, eva));
  }

  /**
   * Validates that the string matches the pattern, replacing the x's with numbers <br/>
   * <b>Example:</b> For the pattern +xx (xxx) xxx-xx-xx, the following Strings are valid:
   * <ul>
   *     <li>+12 (345) 678-90-12</li>
   *     <li>+xx (345) 678-90-12</li>
   *     <li>+xx (xxx) xxx-xx-xx</li>
   * <ul/>
   * @param pattern string with the pattern
   * @param message Error message
   * @return ValidatorBuilder
   */
  numberPattern(pattern: string, message: string = Validator.messages.numberPatternMessage): ValidatorBuilder {
    return this.rule(util.format(message, pattern), (eva) => numberPattern(pattern, eva));
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
