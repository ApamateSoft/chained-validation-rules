import RE from './regularExpressions';

/**
 * Validates that the string is different from null and empty
 * @param evaluate string to evaluate
 * @return true if it meets the condition
 */
export function required(evaluate?: string | null): boolean {
  return !!evaluate;
}

/**
 * Validates that the string has an exact length of characters
 * @param length Character length
 * @param evaluate string to evaluate
 * @return true if it meets the length
 */
export function textLength(length: number, evaluate?: string | null): boolean {
  if (!evaluate) return false;
  return evaluate?.length === length;
}

/**
 * Validates that the size of the string is not less than the min
 * @param min Minimum character size
 * @param evaluate string to evaluate
 * @return true if it meets the min
 */
export function minLength(min: number, evaluate?: string | null): boolean {
  if (!evaluate) return false;
  return evaluate?.length >= min;
}

/**
 * Validates that the size of the string is not greater than the max
 * @param max Maximum character size
 * @param evaluate string to evaluate
 * @return true if it meets the max
 */
export function maxLength(max: number, evaluate?: string | null): boolean {
  if (!evaluate) return false;
  return evaluate?.length <= max;
}

/**
 * Validates that the length of the string is in the established range
 * @param min Minimum character length
 * @param max Maximum character length
 * @param evaluate string to evaluate
 * @return true if it meets the condition
 */
export function rangeLength(min: number, max: number, evaluate?: string | null): boolean {
  if (!evaluate) return false;
  return evaluate.length >= min && evaluate.length <= max;
}

/**
 * Validates that the string matches the regular expression
 * @param evaluate string to evaluate
 * @param regExp Regular expression
 * @return true if it meets the condition
 */
export function re(regExp: string, evaluate?: string | null): boolean {
  if (!required(evaluate)) return false;
  return new RegExp(regExp).test(evaluate || '');
}

/**
 * Validates that the string has an email format
 * @param evaluate string to evaluate
 * @return true if it meets the condition
 */
export function email(evaluate?: string | null): boolean {
  if (!required(evaluate)) return false;
  return re(RE.EMAIL, evaluate);
}

/**
 * Validates that the string is a numeric format <br/>
 * <b>Note:</b> This includes so many integers, decimal, and negative values
 * @param evaluate string to evaluate
 * @return true if it meets the condition
 */
export function number(evaluate?: string | null): boolean {
  if (!required(evaluate)) return false;
  return re(RE.DECIMAL, evaluate);
}

/**
 * Validates that the string is a link format
 * @param evaluate string to evaluate
 * @return true if it meets the condition
 */
export function link(evaluate?: string | null): boolean {
  if (!required(evaluate)) return false;
  return re(RE.LINK, evaluate);
}

/**
 * Validates that the string is a link with www format
 * @param evaluate string to evaluate
 * @return true if it meets the condition
 */
export function wwwLink(evaluate?: string | null): boolean {
  if (!required(evaluate)) return false;
  return re(RE.WWW_LINK, evaluate);
}

/**
 * Validates that the string is a link with http format
 * @param evaluate string to evaluate
 * @return true if it meets the condition
 */
export function httpLink(evaluate?: string | null): boolean {
  if (!required(evaluate)) return false;
  return re(RE.HTTP_LINK, evaluate);
}

/**
 * Validates that the string is a link with https format
 * @param evaluate string to evaluate
 * @return true if it meets the condition
 */
export function httpsLink(evaluate?: string | null): boolean {
  if (!required(evaluate)) return false;
  return re(RE.HTTPS_LINK, evaluate);
}

/**
 * Validates that the string is an ip format
 * @param evaluate string to evaluate
 * @return true if it meets the condition
 */
export function ip(evaluate?: string | null): boolean {
  if (!required(evaluate)) return false;
  return re(RE.IP, evaluate);
}

/**
 * Validates that the string is an ipv4 format
 * @param evaluate string to evaluate
 * @return true if it meets the condition
 */
export function ipv4(evaluate?: string | null): boolean {
  if (!required(evaluate)) return false;
  return re(RE.IPV4, evaluate);
}

/**
 * Validates that the string is an ipv6 format
 * @param evaluate string to evaluate
 * @return true if it meets the condition
 */
export function ipv6(evaluate?: string | null): boolean {
  if (!required(evaluate)) return false;
  return re(RE.IPV6, evaluate);
}

/**
 * Validates that the string is a proper name <br/>
 * <b>Note:</b>
 * <ul>
 *     <li>Capitalization is ignored</li>
 *     <li>
 *         Only valid proper names in English. to evaluate names in other languages it is recommended to use the
 *         {@link re()} function.
 *     </li>
 * <ul/>
 * @param evaluate string to evaluate
 * @return true if it meets the condition
 */
export function name(evaluate?: string | null): boolean {
  if (!required(evaluate)) return false;
  return re(RE.NAME, evaluate);
}

/**
 * Validates that the string is a time format
 * @param evaluate string to evaluate
 * @return true if it meets the condition
 */
export function time(evaluate?: string | null): boolean {
  if (!required(evaluate)) return false;
  return re(RE.TIME, evaluate);
}

/**
 * Validates that the string is a time with 12-hour format
 * @param evaluate string to evaluate
 * @return true if it meets the condition
 */
export function time12(evaluate?: string | null): boolean {
  if (!required(evaluate)) return false;
  return re(RE.TIME12, evaluate);
}

/**
 * Validates that the string is a time with 24-hour format
 * @param evaluate string to evaluate
 * @return true if it meets the condition
 */
export function time24(evaluate?: string | null): boolean {
  if (!required(evaluate)) return false;
  return re(RE.TIME24, evaluate);
}

/**
 * Validates that the string to evaluate only contains numeric characters
 * @param evaluate string to evaluate
 */
export function onlyNumbers(evaluate?: string | null): boolean {
  if (!required(evaluate)) return false;
  return re(RE.NUMBER, evaluate);
}

/**
 * Validates that the string contains only letters <br />
 * <b>Note:</b> It only recognizes letters of the English alphabet
 * @param evaluate string to evaluate
 * @return true if it meets the condition
 */
export function onlyLetters(evaluate?: string | null): boolean {
  if (!required(evaluate)) return false;
  return re(RE.ALPHABET, evaluate);
}

/**
 * Validates that the string contains only alphanumeric characters <br />
 * <b>Note:</b> It only recognizes letters of the English alphabet
 * @param evaluate string to evaluate
 * @return true if it meets the condition
 */
export function onlyAlphanumeric(evaluate?: string | null): boolean {
  if (!required(evaluate)) return false;
  return re(RE.ALPHA_NUMERIC, evaluate);
}

/**
 * Validates that the string does not contain any characters included in the alphabet
 * @param alphabet string with invalid characters
 * @param evaluate string to evaluate
 * @return true if it meets the alphabet
 */
export function notContain(alphabet: string, evaluate?: string | null): boolean {
  if (!required(evaluate)) return false;
  return alphabet.split('').every((char) => !evaluate?.includes(char));
}

/**
 * Validates that the string only contains characters included in the alphabet
 * @param alphabet string with allowed characters
 * @param evaluate string to evaluate
 * @return true if it meets the alphabet
 */
export function shouldOnlyContain(alphabet: string, evaluate?: string | null): boolean {
  if (!evaluate) return false;
  return evaluate.split('').every((char) => alphabet?.includes(char));
}

/**
 * Validates that the string contains at least one character included in the alphabet
 * @param alphabet string with desired characters
 * @param evaluate string to evaluate
 * @return true if it meets the alphabet
 */
export function mustContainOne(alphabet: string, evaluate?: string | null): boolean {
  if (!required(evaluate)) return false;
  return !alphabet.split('').every((char) => !evaluate?.includes(char));
}

/**
 * Validates that the string contains at least a minimum number of characters included in the alphabet
 * @param min minimum value
 * @param alphabet string with desired characters
 * @param evaluate Valid that the entered date has not expired
 * @return true if it meets the alphabet
 */
export function mustContainMin(min: number, alphabet: string, evaluate?: string | null): boolean {
  if (!evaluate) return false;
  let count = 0;
  evaluate.split('').forEach((a) => {
    alphabet.split('').forEach((b) => {
      if (a === b) ++count;
    });
  });
  return count >= min;
}

/**
 * Validates that the value of the string is not less than the condition
 * @param min Minimum value
 * @param evaluate string to evaluate
 * @return true if it meets the condition
 */
export function minValue(min: number, evaluate?: string | null): boolean {
  if (!evaluate || !number(evaluate)) return false;
  return +evaluate >= min;
}

/**
 * Validates that the value of the string is not greater than the condition
 * @param max Maximum value.
 * @param evaluate string to evaluate.
 * @return true if it meets the condition.
 */
export function maxValue(max: number, evaluate?: string | null): boolean {
  if (!evaluate || !number(evaluate)) return false;
  return +evaluate <= max;
}

/**
 * Validates that the value of the string is in the established range
 * @param min minimum value
 * @param max maximum value
 * @param evaluate string to evaluate
 * @return true if it meets the condition
 */
export function rangeValue(min: number, max: number, evaluate?: string | null): boolean {
  if (!evaluate || !number(evaluate)) return false;
  return +evaluate >= min && +evaluate <= max;
}

/**
 * Validates that the string matches the pattern, replacing the x's with numbers <br/>
 * <b>Example:</b> For the pattern +xx (xxx) xxx-xx-xx, the following Strings are valid:
 * <ul>
 *     <li>+12 (345) 678-90-12</li>
 *     <li>+xx (345) 678-90-12</li>
 *     <li>+xx (xxx) xxx-xx-xx</li>
 * <ul/>
 * @param pattern String with the pattern
 * @param evaluate String to evaluate
 * @return true if it meets the condition
 */
export function numberPattern(pattern: string, evaluate?: string | null): boolean {
  if (!evaluate) return false;
  if (evaluate.length !== pattern.length) return false;
  for (let i = 0; i < pattern.split('').length; i++) {
    const patterChar = pattern[i];
    const evaluateChar = evaluate[i];
    if (patterChar === 'x' || patterChar === 'X') {
      if (!onlyNumbers(evaluateChar)) if (patterChar !== evaluateChar) return false;
    } else {
      if (patterChar !== evaluateChar) return false;
    }
  }
  return true;
}
