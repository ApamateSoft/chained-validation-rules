Versión en [Inglés](../README.md)

# Chained validation rules

Facilita la validación de strings encadenando una serie de reglas.

## Notas de versión 0.0.8
- Se agregaron las siguientes reglas predefinidas:
  - `rangeLength`
  - `number`
  - `link`
  - `wwwLink`
  - `httpLink`
  - `httpsLink`
  - `ip`
  - `ipv4`
  - `ipv6`
  - `name`
  - `time`
  - `time12`
  - `time24`
  - `onlyNumbers`
  - `onlyLetters`

## Instalación

```shell
npm i chained-validation-rules
```

## Empezando

### Mi primer validator

```typescript
import { Validator } from 'chained-validation-rules';

// Instanciando un Validator
const validator = new Validator();

// Primera regla, solo se aprobará si el string a evaluar contiene algun caracter, en caso contrario mostrara el mensaje 
// "El texto es requerido"
validator.rule('El texto es requerido', evaluate => {
  return !!evaluate;
});

// Segunda regla, solo se aprobará si el string a evaluar es igual a "xxx", en caso contrario mostrará el mensaje
// "El texto es diferente de xxx"
validator.rule('El texto es diferente de xxx', evaluate => {
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
import { ValidatorBuilder } from 'chained-validation-rules';

const validator = new ValidatorBuilder()
  .rule('El texto es requerido', evaluate => !!evaluate)
  .rule('El texto es diferente de xxx', evaluate => evaluate === 'xxx')
  .build();
```

### Reglas predefinidas

Validator ofrece una serie de reglas predefinidas, tratando de cubrir los casos más comunes de validación.

| Regla	             | Descripción                                                     |
|--------------------|-----------------------------------------------------------------|
| `email`            | Valida que el string tenga un formato de correo electrónico     |
| `textlength`       | Valida que el string tenga una longitud exacta de caracteres    |
| `maxLength`        | Valida que la longitud del string no sea mayor que la condición |
| `minLength`        | Valida que la longitud del string no sea menor que la condición |
| `rangeLength`      | Valida que la longitud del string esté en el rango establecido  |
| `re`               | Valida que el string coincida con la expresión regular          |
| `required`         | Valida que el string sea diferente de nulo, vacío o indefinido  |
| `link`             | Valida que el string sea un formato de enlace                   |
| `wwwLink`          | Valida que el string sea un enlace con formato www              |
| `httpLink`         | Valida que el string sea un enlace con formato http             |
| `httpsLink`        | Valida que el string sea un enlace con formato https            |
| `ip`               | Valida que el string sea un formato de ip                       |
| `ipv4`             | Valida que el string sea un formato de ipv4                     |
| `ipv6`             | Valida que el string sea un formato de ipv6                     |
| `name`             | Valida que el string sea un nombre propio                       |
| `time`             | Valida que el string sea diferente de nulo, vacío o indefinido  |
| `time12`           | Valida que el string sea una hora con formato de 12 horas       |
| `time24`           | Valida que el string sea una hora con formato de 24 horas       |
| `onlyNumbers`      | Valida que el string sea diferente de nulo, vacío o indefinido  |
| `onlyLetters`      | Valida que el string contenga solo letras                       |
| `onlyAlphanumeric` | Valida que el string contenga solo caracteres alfanuméricos     |

Las reglas predefinidas pueden simplificar la definición de un Validator.

```typescript
import { ValidatorBuilder } from 'chained-validation-rules';

const validator = new ValidatorBuilder()
        .required('Requerido')
        .minLength(6, 'Se requiere al menos 6 caracteres')
        .build();
```

### Mensajes predeterminados

Los mensajes en las reglas predefinidas son opcionales, por lo cual se pueden simplificar las implementaciones de las 
mismas de la siguiente manera.

```typescript
import { ValidatorBuilder } from 'chained-validation-rules';

const validator = new ValidatorBuilder()
        .required()
        .minLength(6)
        .build();
```

Los mensajes predeterminados se encuentran en los objetos `messagesEn` para los mensajes en inglés, y en `messagesEs`
para los mensajes en español, ambos implementan la interfaz `Messages`.

| Regla              | Inglés *(Por defecto)*                             | Español                                          |
|--------------------|----------------------------------------------------|--------------------------------------------------|
| `isMath`           | Not match                                          | No coinciden                                     |
| `email`            | Email invalid                                      | Correo electrónico inválido                      |
| `textLength`       | It requires %s characters                          | Se requiere %s caracteres                        |
| `maxLength`        | %s or less characters required                     | Se requiere %s o menos caracteres                |
| `minLength`        | %s or more characters are required                 | Se requiere %s o más caracteres                  |
| `rangeLength`      | The text must contain between %s to %s characters  | El texto debe contener entre %s a %s caracteres  |
| `re`               | The value does not match the regular expression %s | El valor no coincide con la expresión regular %s |
| `required`         | Required                                           | Requerido                                        |
| `link`             | Invalid link                                       | Enlace inválido                                  |
| `wwwLink`          | Invalid www link                                   | Enlace www inválido                              |
| `httpLink`         | Invalid http link                                  | Enlace http inválido                             |
| `httpsLink`        | Invalid https link                                 | Enlace https inválido                            |
| `ip`               | Invalid IP                                         | IP inválida                                      |
| `ipv4`             | Invalid IPv4                                       | IPv4 inválida                                    |
| `ipv6`             | Invalid IPv6                                       | IPv6 inválida                                    |
| `name`             | Invalid personal name                              | Nombre personal inválido                         |
| `time`             | Time invalid                                       | Hora inválida                                    |
| `time12`           | Invalid 12 hour format                             | Formato 12 horas inválido                        |
| `time24`           | Invalid 12 hour format                             | Formato 12 horas inválido                        |
| `onlyNumbers`      | Only numbers                                       | Solo números                                     |
| `onlyLetters`      | Only letters                                       | Solo letras                                      |
| `onlyAlphanumeric` | Just alphanumeric characters                       | Solo caracteres alfanuméricos                    |

##### *Nota:*
- El %s será reemplazado por la condición pasada en la regla predefinida.  

#### Cambiar los mensajes por defecto
Validator posee una variable estática llamada `.messages` el cual recibe como parámetro un objeto del tipo `Messages`.

```typescript
import { Validator } from 'chained-validation-rules';

Validator.messages = {
  compareMessage: 'Mensaje personalizado',
  requiredMessage: 'Mensaje personalizado',
  minLengthMessage: 'Mensaje personalizado',
  maxLengthMessage: 'Mensaje personalizado',
  textLengthMessage: 'Mensaje personalizado',
  emailMessage: 'Mensaje personalizado',
  reMessage: 'Mensaje personalizado'
}
```

#### Cambiando el idioma de los mensajes

```typescript
import { Validator, messagesEs } from 'chained-validation-rules';

Validator.messages = messagesEs
```

### Validando un string

#### Trabajando con eventos

Se hace uso del método `.isValid` para saber si el string es válido.

```typescript
import { ValidatorBuilder } from 'chained-validation-rules';

const validator = new ValidatorBuilder()
  .rule('El texto es diferente de xxx', evaluate => evaluate === 'xxx')
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
import { ValidatorBuilder } from 'chained-validation-rules';

const validator = new ValidatorBuilder()
  .rule('El texto es diferente de xxx', evaluate => evaluate === 'xxx')
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
import { ValidatorBuilder } from 'chained-validation-rules';

const validator = new ValidatorBuilder()
  .rule('El texto es diferente de xxx', evaluate => evaluate === 'xxx')
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
import { ValidatorBuilder, InvalidEvaluationError } from 'chained-validation-rules';

const validator = new ValidatorBuilder()
  .rule('El texto es diferente de xxx', evaluate => evaluate === 'xxx')
  .build();

function submit() {
  try {
    validator.validOrFail()('yyy');
    validator.compareOrFail('xxx', 'yyy');
    // TODO
  } catch (e) {
    if (e instanceof InvalidEvaluationError) {
      console.log(`valor: ${e.value}, mensaje de error: ${e.message}`)
    }
  }
}
```

## Recomendaciones

Comúnmente, suele haber varias instancias de strings a cuáles aplicar las mismas reglas de validación. Para estos casos
se recomienda definir los Validators por contexto, con el fin de definir nuestro Validator una vez y reutilizarlo. Esta
lógica es posible, ya que Validator incluye el método `.copy` el cual genera copias del mismo.

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