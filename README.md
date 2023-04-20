# Chained validation rules

Facilitates the validation of strings by chaining series of rules.

## Translations
- [Spanish](translations/README-es.md)

## Starting

### My first validator

```typescript
import Validator from './Validator';

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
import ValidatorBuilder from './ValidatorBuilder';

const validator = new ValidatorBuilder()
  .rule('Enter a text other than null', (evaluate: string) => evaluate != 0)
  .rule('The text is different from xxx', (evaluate: string) => evaluate === 'xxx')
  .build();
```

### Validating a String

The `.isValid` method is used to find out if the String is valid.

```typescript
import ValidatorBuilder from './ValidatorBuilder';

const validator = new ValidatorBuilder()
  .rule('The text is different from xxx', (evaluate: string) => evaluate === 'xxx')
  .build();

function submit() {
  validator.isValid('yyy'); // false
  validator.isValid('xxx'); // true
}
```

The `.onInvalidEvaluation` event is executed when a rule fails when it is evaluated and returns the error message
associated.

```typescript
import ValidatorBuilder from './ValidatorBuilder';

const validator = new ValidatorBuilder()
  .rule('The text is different from xxx', (evaluate: string) => evaluate === 'xxx')
  .addOnInvalidEvaluation( (message: string) => console.log(message) ) // It is only executed if the validation of some rule fails
  .build();

function submit() {
  validator.isValid('yyy'); // false
  validator.isValid('xxx'); // true
}
```