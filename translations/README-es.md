Versión en [Inglés](../README.md)

# Validator

Facilita la validación de strings encadenando una serie de reglas.

## Empezando

### Mi primer validator

```typescript
import Validator from './Validator';

// Instantiating a new validator
const validator = new Validator();

// Primera regla, solo se aprobará si el string a evaluar es diferente de null, en caso contrario mostrara el mensaje 
// "Ingrese un texto diferente de null"
validator.rule('Ingrese un texto diferente de null', (evaluate: string) => {
  return evaluate != null;
});

// Segunda regla, solo se aprobará si el string a evaluar es igual a "xxx", en caso contrario mostrará el mensaje
// "El texto es diferente de xxx"
validator.rule('El texto es diferente de xxx', (evaluate: string) => {
  return evaluate === 'xxx';
})
```

La función `rule` de validator permite crear reglas de validación específicas, asociadas a un mensaje de error en caso
de que no se cumpla dicha validación.

##### *Nota:*
- Se puede agregar una cantidad indeterminada de reglas.
- Las reglas serán evaluadas en el orden en el cual fueron agregadas.
- Al momento de fallar una regla, se ignoran las restantes.
- Un string se considera válido, solo si este, pasa todas las reglas.
- 
### Simplificando código

Puedes crear una instancia de Validator utilizando el patron builder con `.ValidatorBuilder()`.

```typescript
import ValidatorBuilder from './ValidatorBuilder';

const validator = new ValidatorBuilder()
  .rule('Ingrese un texto diferente de null', (evaluate: string) => evaluate != 0)
  .rule('El texto es diferente de xxx', (evaluate: string) => evaluate === 'xxx')
  .build();
```

### Validando un String

Se hace uso del método `.isValid` para saber si el String es válido.

```typescript
import ValidatorBuilder from './ValidatorBuilder';

const validator = new ValidatorBuilder()
  .rule('El texto es diferente de xxx', (evaluate: string) => evaluate === 'xxx')
  .build();

function submit() {
  validator.isValid('yyy'); // false
  validator.isValid('xxx'); // true
}
```

El evento `.onInvalidEvaluation` se ejecuta al fallar una regla cuando es evaluada y devuelve el mensaje de error
asociado.

```typescript
import ValidatorBuilder from './ValidatorBuilder';

const validator = new ValidatorBuilder()
  .rule('El texto es diferente de xxx', (evaluate: string) => evaluate === 'xxx')
  .addOnInvalidEvaluation( (message: string) => console.log(message) ) // Solo se ejecuta si falla la validación de alguna regla
  .build();

function submit() {
  validator.isValid('yyy'); // false
  validator.isValid('xxx'); // true
}
```