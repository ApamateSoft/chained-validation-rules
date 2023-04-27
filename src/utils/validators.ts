import {
  DECIMAL,
  EMAIL,
  LINK,
  WWW_LINK,
  HTTP_LINK,
  HTTPS_LINK,
  IP,
  IPV4,
  IPV6,
  NAME,
  TIME,
  TIME12,
  TIME24,
  NUMBER,
  ALPHABET,
  ALPHA_NUMERIC,
} from './regularExpressions';

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
  return re(EMAIL, evaluate);
}

/**
 * Validates that the string is a numeric format <br/>
 * <b>Note:</b> This includes so many integers, decimal, and negative values
 * @param evaluate string to evaluate
 * @return true if it meets the condition
 */
export function number(evaluate?: string | null): boolean {
  if (!required(evaluate)) return false;
  return re(DECIMAL, evaluate);
}

/**
 * Validates that the string is a link format
 * @param evaluate string to evaluate
 * @return true if it meets the condition
 */
export function link(evaluate?: string | null): boolean {
  if (!required(evaluate)) return false;
  return re(LINK, evaluate);
}

/**
 * Validates that the string is a link with www format
 * @param evaluate string to evaluate
 * @return true if it meets the condition
 */
export function wwwLink(evaluate?: string | null): boolean {
  if (!required(evaluate)) return false;
  return re(WWW_LINK, evaluate);
}

/**
 * Validates that the string is a link with http format
 * @param evaluate string to evaluate
 * @return true if it meets the condition
 */
export function httpLink(evaluate?: string | null): boolean {
  if (!required(evaluate)) return false;
  return re(HTTP_LINK, evaluate);
}

/**
 * Validates that the string is a link with https format
 * @param evaluate string to evaluate
 * @return true if it meets the condition
 */
export function httpsLink(evaluate?: string | null): boolean {
  if (!required(evaluate)) return false;
  return re(HTTPS_LINK, evaluate);
}

/**
 * Validates that the string is an ip format
 * @param evaluate string to evaluate
 * @return true if it meets the condition
 */
export function ip(evaluate?: string | null): boolean {
  if (!required(evaluate)) return false;
  return re(IP, evaluate);
}

/**
 * Validates that the string is an ipv4 format
 * @param evaluate string to evaluate
 * @return true if it meets the condition
 */
export function ipv4(evaluate?: string | null): boolean {
  if (!required(evaluate)) return false;
  return re(IPV4, evaluate);
}

/**
 * Validates that the string is an ipv6 format
 * @param evaluate string to evaluate
 * @return true if it meets the condition
 */
export function ipv6(evaluate?: string | null): boolean {
  if (!required(evaluate)) return false;
  return re(IPV6, evaluate);
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
  return re(NAME, evaluate);
}

/**
 * Validates that the string is a time format
 * @param evaluate string to evaluate
 * @return true if it meets the condition
 */
export function time(evaluate?: string | null): boolean {
  if (!required(evaluate)) return false;
  return re(TIME, evaluate);
}

/**
 * Validates that the string is a time with 12-hour format
 * @param evaluate string to evaluate
 * @return true if it meets the condition
 */
export function time12(evaluate?: string | null): boolean {
  if (!required(evaluate)) return false;
  return re(TIME12, evaluate);
}

/**
 * Validates that the string is a time with 24-hour format
 * @param evaluate string to evaluate
 * @return true if it meets the condition
 */
export function time24(evaluate?: string | null): boolean {
  if (!required(evaluate)) return false;
  return re(TIME24, evaluate);
}

/**
 * Validates that the string to evaluate only contains numeric characters
 * @param message Error message
 */
export function onlyNumbers(evaluate?: string | null): boolean {
  if (!required(evaluate)) return false;
  return re(NUMBER, evaluate);
}

/**
 * Validates that the string contains only letters <br />
 * <b>Note:</b> It only recognizes letters of the English alphabet
 * @param evaluate string to evaluate
 * @return true if it meets the condition
 */
export function onlyLetters(evaluate?: string | null): boolean {
  if (!required(evaluate)) return false;
  return re(ALPHABET, evaluate);
}

/**
 * Validates that the string contains only alphanumeric characters <br />
 * <b>Note:</b> It only recognizes letters of the English alphabet
 * @param evaluate string to evaluate
 * @return true if it meets the condition
 */
export function onlyAlphanumeric(evaluate?: string | null): boolean {
  if (!required(evaluate)) return false;
  return re(ALPHA_NUMERIC, evaluate);
}
