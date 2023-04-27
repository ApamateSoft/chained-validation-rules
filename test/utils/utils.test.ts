import { describe, expect } from '@jest/globals';
import {
  re,
  email,
  maxLength,
  minLength,
  required,
  textLength,
  rangeLength,
  number,
  link,
  wwwLink,
  httpLink,
  httpsLink,
  ip,
  ipv4,
  ipv6,
  name,
  time,
  time12,
  time24,
  onlyNumbers,
  onlyLetters,
  onlyAlphanumeric,
} from '../../src/utils/validators';

describe('required test', () => {
  const NOT_PERMIT = [null, undefined, ''];
  const PERMIT = [' ', 'xxx'];
  test('notPermit', () => {
    const result = NOT_PERMIT.every((eva) => !required(eva));
    expect(result).toBe(true);
  });
  test('permit', () => {
    const result = PERMIT.every(required);
    expect(result).toBe(true);
  });
});

describe('textLength test', () => {
  const CONDITION = 3;
  const NOT_PERMIT = [null, undefined, '', '12', '1234'];
  const PERMIT = ['123', 'xxx'];
  test('notPermit', () => {
    const result = NOT_PERMIT.every((eva) => !textLength(CONDITION, eva));
    expect(result).toBe(true);
  });
  test('permit', () => {
    const result = PERMIT.every((eva) => textLength(CONDITION, eva));
    expect(result).toBe(true);
  });
});

describe('minLength test', () => {
  const CONDITION = 3;
  const NOT_PERMIT = [null, undefined, '', '1', '12'];
  const PERMIT = ['123', '1234'];
  test('notPermit', () => {
    const result = NOT_PERMIT.every((eva) => !minLength(CONDITION, eva));
    expect(result).toBe(true);
  });
  test('permit', () => {
    const result = PERMIT.every((eva) => minLength(CONDITION, eva));
    expect(result).toBe(true);
  });
});

describe('maxLength test', () => {
  const CONDITION = 3;
  const NOT_PERMIT = [null, undefined, '', '1234'];
  const PERMIT = ['1', '12', '123'];
  test('notPermit', () => {
    const result = NOT_PERMIT.every((eva) => !maxLength(CONDITION, eva));
    expect(result).toBe(true);
  });
  test('permit', () => {
    const result = PERMIT.every((eva) => maxLength(CONDITION, eva));
    expect(result).toBe(true);
  });
});

describe('rangeLength test', () => {
  const MIN = 3;
  const MAX = 5;
  const NOT_PERMIT = [null, undefined, '', '12', '123456'];
  const PERMIT = ['123', '1234', '12345'];
  test('notPermit', () => {
    const result = NOT_PERMIT.every((eva) => !rangeLength(MIN, MAX, eva));
    expect(result).toBe(true);
  });
  test('permit', () => {
    const result = PERMIT.every((eva) => rangeLength(MIN, MAX, eva));
    expect(result).toBe(true);
  });
});

describe('regExp test', () => {
  const CONDITION =
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
  const NOT_PERMIT = [
    null,
    undefined,
    '',
    'example',
    '@mail',
    'example@mail',
    'example@mail.',
    'mail.com',
    '@mail.com',
  ];
  const PERMIT = ['jealmesa@gmail.com'];
  test('notPermit', () => {
    const result = NOT_PERMIT.every((eva) => !re(CONDITION, eva));
    expect(result).toBe(true);
  });
  test('permit', () => {
    const result = PERMIT.every((eva) => re(CONDITION, eva));
    expect(result).toBe(true);
  });
});

describe('email test', () => {
  const NOT_PERMIT = [
    null,
    undefined,
    '',
    'example',
    '@mail',
    'example@mail',
    'example@mail.',
    'mail.com',
    '@mail.com',
  ];
  const PERMIT = ['jealmesa@gmail.com'];
  test('notPermit', () => {
    const result = NOT_PERMIT.every((eva) => !email(eva));
    expect(result).toBe(true);
  });
  test('permit', () => {
    const result = PERMIT.every(email);
    expect(result).toBe(true);
  });
});

describe('number test', () => {
  const NOT_PERMIT = [null, undefined, '', 'text', 'a1', '1a', '12345,6789', '123.456.789'];
  const PERMIT = ['123456789', '-123456789', '12345.6789', '-12345.6789', '1'];
  test('notPermit', () => {
    const result = NOT_PERMIT.every((eva) => !number(eva));
    expect(result).toBe(true);
  });
  test('permit', () => {
    const result = PERMIT.every(number);
    expect(result).toBe(true);
  });
});

describe('link test', () => {
  const NOT_PERMIT = [null, undefined, '', 'google.com', 'text', 'a1', '1a', '12345,6789', '123.456.789'];
  const PERMIT = [
    'www.google.com',
    'http://google.com',
    'https://google.com',
    'http://google.com/api/auth?name=Name&lastName=LastName',
  ];
  test('notPermit', () => {
    const result = NOT_PERMIT.every((eva) => !link(eva));
    expect(result).toBe(true);
  });
  test('permit', () => {
    const result = PERMIT.every(link);
    expect(result).toBe(true);
  });
});

describe('wwwLink test', () => {
  const NOT_PERMIT = [null, undefined, '', 'google.com', 'http://google.com', 'https://google.com'];
  const PERMIT = ['www.google.com', 'www.google.com/api/auth?name=Name&lastName=LastName'];
  test('notPermit', () => {
    const result = NOT_PERMIT.every((eva) => !wwwLink(eva));
    expect(result).toBe(true);
  });
  test('permit', () => {
    const result = PERMIT.every(wwwLink);
    expect(result).toBe(true);
  });
});

describe('httpLink test', () => {
  const NOT_PERMIT = [null, undefined, '', 'google.com', 'http.google.com', 'www.google.com', 'https://google.com'];
  const PERMIT = ['http://google.com', 'http://google.com/api/auth?name=Name&lastName=LastName'];
  test('notPermit', () => {
    const result = NOT_PERMIT.every((eva) => !httpLink(eva));
    expect(result).toBe(true);
  });
  test('permit', () => {
    const result = PERMIT.every(httpLink);
    expect(result).toBe(true);
  });
});

describe('httpsLink test', () => {
  const NOT_PERMIT = [
    null,
    undefined,
    '',
    'google.com',
    'http.google.com',
    'https.google.com',
    'www.google.com',
    'http://google.com',
  ];
  const PERMIT = ['https://google.com', 'https://google.com/api/auth?name=Name&lastName=LastName'];
  test('notPermit', () => {
    const result = NOT_PERMIT.every((eva) => !httpsLink(eva));
    expect(result).toBe(true);
  });
  test('permit', () => {
    const result = PERMIT.every(httpsLink);
    expect(result).toBe(true);
  });
});

describe('ip test', () => {
  const NOT_PERMIT = [
    null,
    undefined,
    '',
    'text',
    '128',
    '10.0.0.256',
    '10.0.0.0.1',
    'ffff::ffff::ffff',
    'fffff::ffff',
    'fffg::ffff',
  ];
  const PERMIT = [
    '127.0.0.1',
    '192.168.0.109',
    '10.0.0.1',
    'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
    'ffff::',
    'ffff::ffff',
    'ffff:ffff::ffff',
  ];
  test('notPermit', () => {
    const result = NOT_PERMIT.every((eva) => !ip(eva));
    expect(result).toBe(true);
  });
  test('permit', () => {
    const result = PERMIT.every(ip);
    expect(result).toBe(true);
  });
});

describe('ipv4 test', () => {
  const NOT_PERMIT = [
    null,
    undefined,
    '',
    'text',
    '128',
    '10.0.0.256',
    '10.0.0.0.1',
    'ffff::ffff::ffff',
    'fffff::ffff',
    'fffg::ffff',
    'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
    'ffff::',
    'ffff::ffff',
    'ffff:ffff::ffff',
  ];
  const PERMIT = ['127.0.0.1', '192.168.0.109', '10.0.0.1'];
  test('notPermit', () => {
    const result = NOT_PERMIT.every((eva) => !ipv4(eva));
    expect(result).toBe(true);
  });
  test('permit', () => {
    const result = PERMIT.every(ipv4);
    expect(result).toBe(true);
  });
});

describe('ipv6 test', () => {
  const NOT_PERMIT = [
    null,
    undefined,
    '',
    'text',
    '128',
    '10.0.0.256',
    '10.0.0.0.1',
    '127.0.0.1',
    '192.168.0.109',
    '10.0.0.1',
    'ffff::ffff::ffff',
    'fffff::ffff',
    'fffg::ffff',
  ];
  const PERMIT = ['ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff', 'ffff::', 'ffff::ffff', 'ffff:ffff::ffff'];
  test('notPermit', () => {
    const result = NOT_PERMIT.every((eva) => !ipv6(eva));
    expect(result).toBe(true);
  });
  test('permit', () => {
    const result = PERMIT.every(ipv6);
    expect(result).toBe(true);
  });
});

describe('name test', () => {
  const NOT_PERMIT = [null, undefined, '', '10', '1jose', '@omar', 'Jesús', 'jesus 1alberto', ' jesus', 'jesus '];
  const PERMIT = ['jesus', 'maria', 'JOSE', 'jesus maria', 'Maria Jose', 'Jose Jesus', 'maria de jose'];
  test('notPermit', () => {
    const result = NOT_PERMIT.every((eva) => !name(eva));
    expect(result).toBe(true);
  });
  test('permit', () => {
    const result = PERMIT.every(name);
    expect(result).toBe(true);
  });
});

describe('time test', () => {
  const NOT_PERMIT = [null, undefined, '', '1200', '01/01/2020', '12-30', '12.50', '25:00', '13:00 am'];
  const PERMIT = ['00:00', '12:30', '12:59 am', '23:59', '1:00 pm', '01:00AM', '01:00pm', '01:00PM'];
  test('notPermit', () => {
    const result = NOT_PERMIT.every((eva) => !time(eva));
    expect(result).toBe(true);
  });
  test('permit', () => {
    const result = PERMIT.every(time);
    expect(result).toBe(true);
  });
});

describe('time12 test', () => {
  const NOT_PERMIT = [
    null,
    undefined,
    '',
    '1200',
    '01/01/2020',
    '12-30',
    '12.50',
    '25:00',
    '13:00 am',
    '23:59',
    '00:00',
    '23:59',
  ];
  const PERMIT = ['12:59 am', '1:00 pm', '01:00AM', '01:00pm'];
  test('notPermit', () => {
    const result = NOT_PERMIT.every((eva) => !time12(eva));
    expect(result).toBe(true);
  });
  test('permit', () => {
    const result = PERMIT.every(time12);
    expect(result).toBe(true);
  });
});

describe('time24 test', () => {
  const NOT_PERMIT = [
    null,
    undefined,
    '',
    'text',
    '12:59 am',
    '1:00 pm',
    '01:00AM',
    '01:00pm',
    '1200',
    '01/01/2020',
    '12-30',
    '12.50',
    '25:00',
    '13:00 am',
  ];
  const PERMIT = ['13:00', '23:59', '00:00'];
  test('notPermit', () => {
    const result = NOT_PERMIT.every((eva) => !time24(eva));
    expect(result).toBe(true);
  });
  test('permit', () => {
    const result = PERMIT.every(time24);
    expect(result).toBe(true);
  });
});

describe('onlyNumbers test', () => {
  const NOT_PERMIT = [null, undefined, '', 'text', '1a', 'a1', '1a1', 'a1a', '1.00', '1,00'];
  const PERMIT = ['123456789'];
  test('notPermit', () => {
    const result = NOT_PERMIT.every((eva) => !onlyNumbers(eva));
    expect(result).toBe(true);
  });
  test('permit', () => {
    const result = PERMIT.every(onlyNumbers);
    expect(result).toBe(true);
  });
});

describe('onlyLetters test', () => {
  const NOT_PERMIT = [null, undefined, '', '12', '*/', 'a1', 'a-', '-1.61', '$10,320.00'];
  const PERMIT = ['aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ'];
  test('notPermit', () => {
    const result = NOT_PERMIT.every((eva) => !onlyLetters(eva));
    expect(result).toBe(true);
  });
  test('permit', () => {
    const result = PERMIT.every(onlyLetters);
    expect(result).toBe(true);
  });
});

describe('onlyAlphanumeric test', () => {
  const NOT_PERMIT = [null, undefined, '', '-', 'a*', '>text', 'a-', '-1.61', '$10,320.00', 'a b'];
  const PERMIT = ['0123456789aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ'];
  test('notPermit', () => {
    const result = NOT_PERMIT.every((eva) => !onlyAlphanumeric(eva));
    expect(result).toBe(true);
  });
  test('permit', () => {
    const result = PERMIT.every(onlyAlphanumeric);
    expect(result).toBe(true);
  });
});
