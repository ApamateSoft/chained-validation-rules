# Chained validation rules

Facilitates the validation of strings by chaining series of rules.

## Translations
- [Spanish](translations/README-es.md)

## Release Notes 0.0.6
- Added predefined rules.

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

| Regla	       | Descripción                                                               |
|--------------|---------------------------------------------------------------------------|
| `email`      | Validates that the string has an email format                             |
| `textlength` | Validates that the string has an exact length of characters               |
| `maxLength`  | Validates that the length of the string is not greater than the condition |
| `minLength`  | Validates that the length of the string is not less than the condition    |
| `re`         | Validates that the string matches the regular expression                  |
| `required`   | Validates that the string is different from null, empty or undefined      |

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
import { ValidatorBuilder } from "chained-validation-rules";

const validator = new ValidatorBuilder()
        .required()
        .minLength(6)
        .build();
```

The default messages are found in the `messagesEn` objects for English messages, and in `messagesEs` for Spanish 
messages, both implement the `Messages` interface.

| Rule         | English *(default)*                                | Spanish                                          |
|--------------|----------------------------------------------------|--------------------------------------------------|
| `isMath`     | Not match                                          | No coinciden                                     |
| `email`      | Email invalid                                      | Correo electrónico inválido                      |
| `textLength` | It requires %s characters                          | Se requiere %s caracteres                        |
| `maxLength`  | %s or less characters required                     | Se requiere %s o menos caracteres                |
| `minLength`  | %s or more characters are required                 | Se requiere %s o más caracteres                  |
| `re`         | The value does not match the regular expression %s | El valor no coincide con la expresión regular %s |
| `required`   | Required                                           | Requerido                                        |

##### *Note:*
- The %s will be replaced by the condition passed in the predefined rule.

#### Change default messages
Validator has a static variable called `.messages` which receives an object of type `Messages` as a parameter.

```typescript
import { Validator } from 'chained-validation-rules';

Validator.messages = {
  compareMessage: 'Custom message',
  requiredMessage: 'Custom message',
  minLengthMessage: 'Custom message',
  maxLengthMessage: 'Custom message',
  textLengthMessage: 'Custom message',
  emailMessage: 'Custom message',
  reMessage: 'Custom message'
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
evaluated.

```typescript
import { ValidatorBuilder, InvalidEvaluationError } from 'chained-validation-rules';

const validator = new ValidatorBuilder()
  .rule('The text is different from xxx', evaluate => evaluate === 'xxx')
  .build();

function submit() {
  try {
    validator.validOrFail()('yyy');
    validator.compareOrFail('xxx', 'yyy');
    // TODO
  } catch (e) {
    if (e instanceof InvalidEvaluationError) {
      console.log(`value: ${e.value}, error message: ${e.message}`)
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
  .minLength(8)
  .build();
```

*login.ts*
```typescript
import { ValidatorBuilder, InvalidEvaluationError } from 'chained-validation-rules';
import { email, password } from './validators.ts';

const emailValidator = email.copy();
const pswValidator = password.copy()

let email, psw, pswConfirmation: string = '';

function submit() {
  if (
    !emailValidator.isValid(email) ||
    !pswValidator.isMatch(psw, pswConfirmation)
  ) return;
  // TODO
}

function submitWithExceptions() {
  try {
    emailValidator.validOrFail(email);
    pswValidator.compareOrFail(psw, pswConfirmation);
    // TODO
  } catch (e) {
    if (e instanceof InvalidEvaluationError) {
      console.log(`valor: ${e.value}, mensaje de error: ${e.message}`)
    }
  }
}
```