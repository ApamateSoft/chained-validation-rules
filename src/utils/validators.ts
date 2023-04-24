/**
  Validates that the string is different from null and empty
  @param evaluate string to evaluate
  @return true if it meets the condition
 */
export function required(evaluate?: string | null): boolean {
  return !!evaluate;
}

/**
  Validates that the string has an exact size of characters
  @param size Character size
  @param evaluate string to evaluate
  @return true if it meets the size
 */
export function size(size: number, evaluate?: string | null): boolean {
  if (!evaluate) return false;
  return evaluate?.length === size;
}

/**
  Validates that the size of the string is not less than the min
  @param min Minimum character size
  @param evaluate string to evaluate
  @return true if it meets the min
 */
export function minSize(min: number, evaluate?: string | null): boolean {
  if (!evaluate) return false;
  return evaluate?.length >= min;
}

/**
  Validates that the size of the string is not greater than the max
  @param max Maximum character size
  @param evaluate string to evaluate
  @return true if it meets the max
 */
export function maxSize(max: number, evaluate?: string | null): boolean {
  if (!evaluate) return false;
  return evaluate?.length <= max;
}

/**
  Validates that the string matches the regular expression
  @param evaluate string to evaluate
  @param regExp Regular expression
  @return true if it meets the condition
 */
export function _regExp(regExp: string, evaluate?: string | null): boolean {
  if (!required(evaluate)) return false;
  return new RegExp(regExp).test(evaluate || '');
}

/**
  Validates that the string has an email format
  @param evaluate string to evaluate
  @return true if it meets the condition
 */
export function email(evaluate?: string | null): boolean {
  if (!required(evaluate)) return false;
  const EMAIL =
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
  return _regExp(EMAIL, evaluate);
}
