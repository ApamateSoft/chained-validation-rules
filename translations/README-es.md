Versión en [Inglés](../README.md)

# Chained validation rules

Facilita la validación de strings encadenando una serie de reglas.

## Notas de versión 0.0.5
- Se ha agregado los siguientes métodos:
  - `copy`
  - `isMatch`
  - `validOrFail`
  - `compareOrFail`

## Instalación

```shell
npm i chained-validation-rules
```

## Empezando

### Mi primer validator

```typescript
import {Validator} from 'chained-validation-rules';

// Instanciando un Validator
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

### Simplificando código

Puedes crear una instancia de Validator utilizando el patron builder con `.ValidatorBuilder()`.

```typescript
import {ValidatorBuilder} from "chained-validation-rules";

const validator = new ValidatorBuilder()
  .rule('Ingrese un texto diferente de null', (evaluate: string) => evaluate != 0)
  .rule('El texto es diferente de xxx', (evaluate: string) => evaluate === 'xxx')
  .build();
```

### Validando un string

#### Trabajando con eventos

Se hace uso del método `.isValid` para saber si el string es válido.

```typescript
import {ValidatorBuilder} from 'chained-validation-rules';

const validator = new ValidatorBuilder()
  .rule('El texto es diferente de xxx', (evaluate: string) => evaluate === 'xxx')
  .build();

function submit() {
  validator.isValid('yyy'); // false
  validator.isValid('xxx'); // true
}
```

En caso de querer comparar dos string, *lo cual es muy útil para validar contraseñas*, se puede hacer uso del método
`.isMath`. Opcionalmente, se puede definir un mensaje de error definiendo la propiedad `.notMatchMessage` para el 
mensaje de error en caso de no coincidir.

```typescript
import {ValidatorBuilder} from 'chained-validation-rules';

const validator = new ValidatorBuilder()
  .rule('El texto es diferente de xxx', (evaluate: string) => evaluate === 'xxx')
  .setNotMatchMessage('No coincide')
  .build();

function submit() {
  validator.isMatch('abc', 'xyz'); // false
  validator.isMatch('abc', 'abc'); // true
}
```

El evento `.onInvalidEvaluation` se ejecuta al fallar una regla cuando es evaluada y devuelve el mensaje de error 
asociado.

```typescript
import {ValidatorBuilder} from 'chained-validation-rules';

const validator = new ValidatorBuilder()
  .rule('El texto es diferente de xxx', (evaluate: string) => evaluate === 'xxx')
  .addOnInvalidEvaluation( (message: string) => console.log(message) ) // Solo se ejecuta si falla la validación de alguna regla
  .build();

function submit() {
  validator.isValid('yyy');
}
```

#### Trabajar con excepciones

Si se prefiere no utilizar el evento `.onInvalidEvaluation`, se puede usar los métodos `.validOrFail` y`.compareOrFail` 
en sustitución de los métodos `.isValid` e `.isMatch` respectivamente.

La principal diferencia es que estos métodos no retorna valor alguno y en caso de fallar, arrojan una excepción del tipo
`InvalidEvaluationError` que contiene el mensaje de error de la regla junto con el valor del string evaluado.

```typescript
import {ValidatorBuilder, InvalidEvaluationError} from 'chained-validation-rules';

const validator = new ValidatorBuilder()
  .rule('El texto es diferente de xxx', (evaluate: string) => evaluate === 'xxx')
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

## Recomendaciones

Comúnmente, suele haber varias instancias de strings a cuáles aplicar las mismas reglas de validación. Para estos casos
se recomienda definir los Validators por contexto, con el fin de definir nuestro Validator una vez y reutilizarlo. Esta
lógica es posible, ya que Validator incluye el método `.copy` el cual genera copias del mismo.

```typescript
import {ValidatorBuilder, InvalidEvaluationError} from 'chained-validation-rules';

const nick = new ValidatorBuilder()
  .rule('Nombre invalido', (evaluate: string) => evaluate === 'ApamateSoft')
  .build();

const password = new ValidatorBuilder()
  .rule('Contraseña invalida', (evaluate: string) => evaluate.length >= 8 )
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