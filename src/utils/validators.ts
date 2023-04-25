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
  const EMAIL =
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
  return re(EMAIL, evaluate);
}
