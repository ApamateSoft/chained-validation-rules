import { describe, expect } from '@jest/globals';
import {_regExp, email, maxSize, minSize, required, size} from '../../src/utils/validators';

describe('required test', () => {
  const NOT_PERMIT = [null, undefined, ''];
  const PERMIT = [' ', 'xxx'];
  test('notPermit', () => {
    const result = NOT_PERMIT.every(eva => !required(eva));
    expect(result).toBe(true);
  });
  test('permit', () => {
    const result = PERMIT.every(required);
    expect(result).toBe(true);
  });
});

describe('size test', () => {
  const CONDITION = 3;
  const NOT_PERMIT = [null, undefined, '', '12', '1234'];
  const PERMIT = ['123', 'xxx'];
  test('notPermit', () => {
    const result = NOT_PERMIT.every(eva => !size(CONDITION, eva));
    expect(result).toBe(true);
  });
  test('permit', () => {
    const result = PERMIT.every(eva => size(CONDITION, eva));
    expect(result).toBe(true);
  });
});

describe('minSize test', () => {
  const CONDITION = 3;
  const NOT_PERMIT = [null, undefined, '', '1', '12'];
  const PERMIT = ['123', '1234'];
  test('notPermit', () => {
    const result = NOT_PERMIT.every(eva => !minSize(CONDITION, eva));
    expect(result).toBe(true);
  });
  test('permit', () => {
    const result = PERMIT.every(eva => minSize(CONDITION, eva));
    expect(result).toBe(true);
  });
});

describe('maxSize test', () => {
  const CONDITION = 3;
  const NOT_PERMIT = [null, undefined, '', '1234'];
  const PERMIT = ['1', '12', '123'];
  test('notPermit', () => {
    const result = NOT_PERMIT.every(eva => !maxSize(CONDITION, eva));
    expect(result).toBe(true);
  });
  test('permit', () => {
    const result = PERMIT.every(eva => maxSize(CONDITION, eva));
    expect(result).toBe(true);
  });
});

describe('regExp test', () => {
  const CONDITION = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
  const NOT_PERMIT = [null, undefined, '', "example", "@mail", "example@mail", "example@mail.", "mail.com", "@mail.com"];
  const PERMIT = ['jealmesa@gmail.com'];
  test('notPermit', () => {
    const result = NOT_PERMIT.every(eva => !_regExp(CONDITION, eva));
    expect(result).toBe(true);
  });
  test('permit', () => {
    const result = PERMIT.every(eva => _regExp(CONDITION, eva));
    expect(result).toBe(true);
  });
});

describe('email test', () => {
  const NOT_PERMIT = [null, undefined, '', "example", "@mail", "example@mail", "example@mail.", "mail.com", "@mail.com"];
  const PERMIT = ['jealmesa@gmail.com'];
  test('notPermit', () => {
    const result = NOT_PERMIT.every(eva => !email(eva));
    expect(result).toBe(true);
  });
  test('permit', () => {
    const result = PERMIT.every(email);
    expect(result).toBe(true);
  });
});
