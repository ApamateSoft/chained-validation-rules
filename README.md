# Chained validation rules

Facilitates the validation of strings by chaining series of rules.

## Translations
- [Spanish](translations/README-es.md)

## Release Notes 0.0.5
- The following methods have been added:
    - `copy`
    - `isMatch`
    - `validOrFail`
    - `compareOrFail`

## Installation

```shell
npm i chained-validation-rules
```

## Starting

### My first validator

```typescript
import {Validator} from 'chained-validation-rules';

// Instantiating a new validator
const validator = new Validator();

// First rule, it will only be approved if the String to be evaluated is different from null, otherwise it will show
// the message "Enter a text different from null"
validator.rule('Enter a text other than null', (evaluate: string) => {
  return evaluate != null;
});

// Second rule, it will only be approved if the String to be evaluated is equal to "xxx", otherwise it will show the
// message "The text is different from xxx"
validator.rule('The text is different from xxx', (evaluate: string) => {
  return evaluate === 'xxx';
})
```

The validator `rule` function allows you to create specific validation rules, associated with an error message in case
that this validation is not fulfilled.

##### *Note:*
- An indeterminate number of rules can be added.
- Rules will be evaluated in the order in which they were added.
- When a rule fails, the rest are ignored.
- A String is considered valid only if it passes all the rules.

### Simplifying code

You can create a Validator instance using the pattern builder with `.ValidatorBuilder()`.

```typescript
import {ValidatorBuilder} from "chained-validation-rules";

const validator = new ValidatorBuilder()
  .rule('Enter a text other than null', (evaluate: string) => evaluate != 0)
  .rule('The text is different from xxx', (evaluate: string) => evaluate === 'xxx')
  .build();
```

### Validating a String

#### Working with events

The `.isValid` method is used to find out if the String is valid.

```typescript
import {ValidatorBuilder} from "chained-validation-rules";

const validator = new ValidatorBuilder()
  .rule('The text is different from xxx', (evaluate: string) => evaluate === 'xxx')
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
import {ValidatorBuilder} from 'chained-validation-rules';

const validator = new ValidatorBuilder()
  .rule('The text is different from xxx', (evaluate: string) => evaluate === 'xxx')
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
import {ValidatorBuilder} from "chained-validation-rules";

const validator = new ValidatorBuilder()
  .rule('The text is different from xxx', (evaluate: string) => evaluate === 'xxx')
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
`InvalidEvaluationError` containing the error message from the rule along with the value of the String to be
evaluated.

```typescript
import {ValidatorBuilder, InvalidEvaluationError} from 'chained-validation-rules';

const validator = new ValidatorBuilder()
  .rule('The text is different from xxx', (evaluate: string) => evaluate === 'xxx')
  .build();

function submit() {
  try {
    validator.validOrFail()('yyy');
    validator.compareOrFail('xxx', 'yyy');
    // TODO
  } catch (e) {
    console.log(e.message)
  }
}
```

## recommendations

Commonly, there are several instances of strings to which to apply the same validation rules. for these cases
It is recommended to define Validators per context, in order to define our Validator once and reuse it. This
Logic is possible, since Validator includes a `.copy` method which generates copies of it.

```typescript
import {ValidatorBuilder, InvalidEvaluationError} from 'chained-validation-rules';

const nick = new ValidatorBuilder()
  .rule('Invalid nick', (evaluate: string) => evaluate === 'ApamateSoft')
  .build();

const password = new ValidatorBuilder()
  .rule('Invalid password', (evaluate: string) => evaluate.length >= 8 )
  .build();

class Login {
    constructor(
      private readonly nickValidator: Validator = nick.copy(),
      private readonly pswValidator: Validator = password.copy(),
      private nick: string,
      private psw: string,
      private pswConfirmation: string
    ) {
      nickValidator.onInvalidEvaluation = (message: string) => console.log(message);
      pswValidator.onInvalidEvaluation = (message: string) => console.log(message);
    }

    submit() {
        if (
            !this.nickValidator.isValid(email) || 
            !this.pswValidator.isMatch(psw, pswConfirmation)
        ) return;
        // TODO
    }

    submitWithExceptions() {
        try {
          this.nickValidator.validOrFail(email);
          this.pswValidator.compareOrFail(psw, pswConfirmation);
            // TODO
        } catch (e) {
            Console.log(e.message);
        }
    }

}
```


