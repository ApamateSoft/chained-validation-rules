# Chained validation rules

Facilitates the validation of strings by chaining series of rules.

## Translations
- [Spanish](translations/README-es.md)

## Release Notes 0.0.12
- Added predefined rule `number Pattern`.
- The structure of the default messages has been changed.

## Installation

```shell
npm i chained-validation-rules
```

## Starting

### My first validator

```typescript
import { Validator } from 'chained-validation-rules';

// Instantiating a new validator
const validator = new Validator();

// First rule, it will only be approved if the string to evaluate contains some character, otherwise it will show the 
// message "The text is required"
validator.rule('The text is required', evaluate => {
  return !!evaluate;
});

// Second rule, it will only be approved if the string to be evaluated is equal to "xxx", otherwise it will show the
// message "The text is different from xxx"
validator.rule('The text is different from xxx', evaluate => {
  return evaluate === 'xxx';
})
```

The validator `rule` function allows you to create specific validation rules, associated with an error message in case
that this validation is not fulfilled.

##### *Note:*
- An indeterminate number of rules can be added.
- Rules will be evaluated in the order in which they were added.
- When a rule fails, the rest are ignored.
- A string is considered valid only if it passes all the rules.

### Simplifying code

You can create a Validator instance using the pattern builder with `.ValidatorBuilder()`.

```typescript
import { ValidatorBuilder } from 'chained-validation-rules';

const validator = new ValidatorBuilder()
  .rule('The text is required', evaluate => !!evaluate)
  .rule('The text is different from xxx', evaluate => evaluate === 'xxx')
  .build();
```
### Predefined rules

Validator offers a series of predefined rules, trying to cover the most common validation cases.

| Rule	               | Description                                                                                          |
|---------------------|------------------------------------------------------------------------------------------------------|
| `email`             | Validates that the string has an email format                                                        |
| `textLength`        | Validates that the string has an exact length of characters                                          |
| `maxLength`         | Validates that the length of the string is not greater than the condition                            |
| `minLength`         | Validates that the length of the string is not less than the condition                               |
| `rangeLength`       | Validates that the length of the String is in the established range                                  |
| `re`                | Validates that the string matches the regular expression                                             |
| `required`          | Validates that the string is different from null, empty or undefined                                 |
| `link`              | Validates that the String is a link format                                                           |
| `wwwLink`           | Validates that the String is a link with www format                                                  |
| `httpLink`          | Validates that the String is a link with http format                                                 |
| `httpsLink`         | Validates that the String is a link with https format                                                |
| `ip`                | Validates that the String is an ip format                                                            |
| `ipv4`              | Validates that the String is an ipv4 format                                                          |
| `ipv6`              | Validates that the String is an ipv6 format                                                          |
| `name`              | Validates that the String is a proper name                                                           |
| `time`              | Validates that the String is a time format                                                           |
| `time12`            | Validates that the String is a time with 12-hour format                                              |
| `time24`            | Validates that the String is a time with 24-hour format                                              |
| `onlyNumbers`       | Validates that the String to evaluate only contains numeric characters                               |
| `onlyLetters`       | Validates that the String contains only letters                                                      |
| `onlyAlphanumeric`  | Validates that the String contains only alphanumeric characters                                      |
| `notContain`        | Validates that the String does not contain any character included in the condition                   |
| `shouldOnlyContain` | Validates that the String only contains characters included in the condition                         |
| `mustContainOne`    | Validates that the String contains at least one character included in the condition                  |
| `mustContainMin`    | Validates that the String contains at least a minimum number of characters included in the condition |
| `minValue`          | Validates that the value of the String is not less than the condition                                |
| `maxValue`          | Validates that the value of the String is not greater than the condition                             |
| `rangeValue`        | Validates that the value of the String is in the established range                                   |
| `number`            | Validates that the String is a numeric format                                                        |
| `numberPattern`     | Validates that the String matches the pattern, replacing the x's with numbers                        |

Predefined rules can simplify the definition of a Validator.

```typescript
import { ValidatorBuilder } from 'chained-validation-rules';

const validator = new ValidatorBuilder()
        .required('Required')
        .minLength(6, 'At least 6 characters required')
        .build();
```

### Default messages

The messages in the predefined rules are optional, so you can simplify the implementations as follows.

```typescript
import { ValidatorBuilder } from 'chained-validation-rules';

const validator = new ValidatorBuilder()
        .required()
        .minLength(6)
        .build();
```

The default messages are found in the `messagesEn` objects for English messages, and in `messagesEs` for Spanish 
messages, both implement the `Messages` interface.

| Rule                | English *(default)*                                               | Spanish                                                           |
|---------------------|-------------------------------------------------------------------|-------------------------------------------------------------------|
| `isMath`            | Not match                                                         | No coinciden                                                      |
| `email`             | Email invalid                                                     | Correo electrónico inválido                                       |
| `textLength`        | It requires %length characters                                    | Se requiere %length caracteres                                    |
| `maxLength`         | %max or less characters required                                  | Se requiere %max o menos caracteres                               |
| `minLength`         | %min or more characters are required                              | Se requiere %min o más caracteres                                 |
| `rangeLength`       | The text must contain between %min to %max characters             | El texto debe contener entre %min a %max caracteres               |
| `re`                | The value does not match the regular expression %regExp           | El valor no coincide con la expresión regular %regExp             |
| `required`          | Required                                                          | Requerido                                                         |
| `link`              | Invalid link                                                      | Enlace inválido                                                   |
| `wwwLink`           | Invalid www link                                                  | Enlace www inválido                                               |
| `httpLink`          | Invalid http link                                                 | Enlace http inválido                                              |
| `httpsLink`         | Invalid https link                                                | Enlace https inválido                                             |
| `ip`                | Invalid IP                                                        | IP inválida                                                       |
| `ipv4`              | Invalid IPv4                                                      | IPv4 inválida                                                     |
| `ipv6`              | Invalid IPv6                                                      | IPv6 inválida                                                     |
| `name`              | Invalid personal name                                             | Nombre personal inválido                                          |
| `time`              | Time invalid                                                      | Hora inválida                                                     |
| `time12`            | Invalid 12 hour format                                            | Formato 12 horas inválido                                         |
| `time24`            | Invalid 12 hour format                                            | Formato 12 horas inválido                                         |
| `onlyNumbers`       | Only numbers                                                      | Solo números                                                      |
| `onlyLetters`       | Only letters                                                      | Solo letras                                                       |
| `onlyAlphanumeric`  | Just alphanumeric characters                                      | Solo caracteres alfanuméricos                                     |
| `notContain`        | The following characters aren't admitted %alphabet                | No se admiten los siguientes caracteres %alphabet                 |
| `shouldOnlyContain` | They are just admitted the following characters %alphabet         | Solo se admiten los siguientes caracteres %alphabet               |
| `mustContainOne`    | At least one of the following characters is required: %alphabet   | Se requiere al menos uno de los siguientes caracteres: %alphabet  |
| `mustContainMin`    | At least %min of the following characters are required: %alphabet | Se requiere al menos %min de los siguientes caracteres: %alphabet |
| `minValue`          | The value cannot be less than %min                                | El valor no puede ser menor a %min                                |
| `maxValue`          | The value cannot be greater than %max                             | El valor no puede ser mayor a %max                                |
| `rangeValue`        | The value must be between %min and %max                           | El valor debe estar entre %min y %max                             |
| `number`            | It is not a number                                                | No es un número                                                   |
| `numberPattern`     | Does not match pattern %pattern                                   | No coincide con el patrón %pattern                                |

##### *Note:*
- The % followed by the variable name will be replaced by the condition passed in the predefined rule.
- The message passed directly into the rule has priority over the default messages.

#### Change default messages
Validator has a static variable called `.messages` which receives an object of type `Messages` as a parameter.

```typescript
import { Validator } from 'chained-validation-rules';

Validator.messages = {
  onlyAlphanumericMessage: 'Custom message',
  onlyLettersMessage: 'Custom message',
  onlyNumbersMessage: 'Custom message',
  compareMessage: 'Custom message',
  requiredMessage: 'Custom message',
  minLengthMessage: 'Custom message',
  maxLengthMessage: 'Custom message',
  rangeLengthMessage: 'Custom message',
  textLengthMessage: 'Custom message',
  emailMessage: 'Custom message',
  reMessage: 'Custom message',
  numberMessage: 'Custom message',
  linkMessage: 'Custom message',
  wwwLinkMessage: 'Custom message',
  httpLinkMessage: 'Custom message',
  httpsLinkMessage: 'Custom message',
  ipMessage: 'Custom message',
  ipv4Message: 'Custom message',
  ipv6Message: 'Custom message',
  nameMessage: 'Custom message',
  timeMessage: 'Custom message',
  time12Message: 'Custom message',
  time24Message: 'Custom message',
  notContainMessage: 'Custom message',
  shouldOnlyContainMessage: 'Custom message',
  mustContainOneMessage: 'Custom message',
  mustContainMinMessage: 'Custom message',
  minValueMessage: 'Custom message',
  maxValueMessage: 'Custom message',
  rangeValueMessage: 'Custom message',
  numberPatternMessage: 'Custom message',
}
```

#### Changing the message language

```typescript
import { Validator, messagesEs } from 'chained-validation-rules';

Validator.messages = messagesEs
```

### Validating a string

#### Working with events

The `.isValid` method is used to find out if the string is valid.

```typescript
import { ValidatorBuilder } from 'chained-validation-rules';

const validator = new ValidatorBuilder()
  .rule('The text is different from xxx', evaluate => evaluate === 'xxx')
  .build();

function submit() {
  validator.isValid('yyy'); // false
  validator.isValid('xxx'); // true
}
```

In case you want to compare two strings, *which is very useful to validate passwords*, you can use the method
`.isMath`. Optionally, an error message can be defined by defining the `.notMatchMessage` property for the
error message if it doesn't match.

```typescript
import { ValidatorBuilder } from 'chained-validation-rules';

const validator = new ValidatorBuilder()
  .rule('The text is different from xxx', evaluate => evaluate === 'xxx')
  .setNotMatchMessage('Not match')
  .build();

function submit() {
  validator.isMatch('abc', 'xyz'); // false
  validator.isMatch('abc', 'abc'); // true
}
```

The `.onInvalidEvaluation` event is executed when a rule fails when it is evaluated and returns the error message
associated.

```typescript
import { ValidatorBuilder } from 'chained-validation-rules';

const validator = new ValidatorBuilder()
  .rule('The text is different from xxx', evaluate => evaluate === 'xxx')
  .addOnInvalidEvaluation( (message: string) => console.log(message) ) // It is only executed if the validation of some rule fails
  .build();

function submit() {
  validator.isValid('yyy');
}
```

#### Work with exceptions

If you prefer not to use the `.onInvalidEvaluation` event, you can use the `.validOrFail` and `.compareOrFail` methods
replacing the `.isValid` and `.isMatch` methods respectively.

The main difference is that these methods do not return any value and if they fail, they throw an exception to the type
`InvalidEvaluationError` containing the error message from the rule along with the value of the string to be
evaluated and a key which works as an identifier.

```typescript
import { ValidatorBuilder, InvalidEvaluationError } from 'chained-validation-rules';

const validator = new ValidatorBuilder()
  .rule('The text is different from xxx', evaluate => evaluate === 'xxx')
  .build();

function submit() {
  try {
    validator.validOrFail('textKey', 'yyy');
    // or
    validator.compareOrFail('textKey', 'xxx', 'yyy');
    // TODO ...
  } catch (e) {
    if (e instanceof InvalidEvaluationError) {
      console.log(`key: ${e.key}, value: ${e.value}, error message: ${e.message}`)
    }
  }
}
```

## recommendations

Commonly, there are several instances of strings to which to apply the same validation rules. for these cases it is 
recommended to define Validators per context, in order to define our Validator once and reuse it. This logic is 
possible, since Validator includes a `.copy` method which generates copies of it.

*validators.ts*
```typescript
import { ValidatorBuilder } from 'chained-validation-rules';

export const email = new ValidatorBuilder()
  .required()
  .email()
  .build();

export const password = new ValidatorBuilder()
  .required()
  .minLength(12)
  .mustContainMin(3, 'abcdefghijklmnopqrstuvwxyz')
  .mustContainMin(3, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')
  .mustContainMin(3, '0123456789')
  .mustContainMin(3, '@~_/')
  .build();
```

*login.ts (example with events)*
```typescript
import { ValidatorBuilder, InvalidEvaluationError } from 'chained-validation-rules';
import { email as _email, password } from './validators.ts';

let email: string, psw: string, pswConfirmation: string = '';

const emailValidator: Validator = _email.copy();
const pswValidator: Validator = password.copy()

emailValidator.onInvalidEvaluation = (error: string) => {
  // TODO handle error for email
}
pswValidator.onInvalidEvaluation = (error: string) => {
  // TODO handle error for password
}

function submit() {
  if (
    !emailValidator.isValid(email) || 
    !pswValidator.isMatch(psw, pswConfirmation)
  ) return;
  // TODO proceed with submit
}
```

*login.ts (example with exception)*
```typescript
import { ValidatorBuilder, InvalidEvaluationError } from 'chained-validation-rules';
import { email as _email, password } from './validators.ts';

let email: string, psw: string, pswConfirmation: string = '';

const emailValidator: Validator = _email.copy();
const pswValidator: Validator = password.copy()

function submit() {
  try {
    emailValidator.validOrFail('email', email);
    pswValidator.compareOrFail('psw', psw, pswConfirmation);
    // TODO proceed with submit
  } catch (e) {
    if (e instanceof InvalidEvaluationError) {
      switch (e.key) {
        case 'email':
          // TODO handle error for email
          break;
        case 'psw':
          // TODO handle error for password
          break;
      }
    }
  }
}
```