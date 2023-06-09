import Messages from './Messages';

const messageEs: Messages = Object.freeze({
  onlyAlphanumericMessage: 'Solo caracteres alfanuméricos',
  onlyLettersMessage: 'Solo letras',
  onlyNumbersMessage: 'Solo números',
  httpLinkMessage: 'Enlace http inválido',
  httpsLinkMessage: 'Enlace https inválido',
  ipMessage: 'IP inválida',
  ipv4Message: 'IPv4 inválida',
  ipv6Message: 'IPv6 inválida',
  linkMessage: 'Enlace invalido',
  nameMessage: 'Nombre personal inválido',
  time12Message: 'Formato 12 horas invalido',
  time24Message: 'Formato 24 horas invalido',
  timeMessage: 'Hora inválida',
  wwwLinkMessage: 'Enlace www inválido',
  emailMessage: 'Correo electrónico invalido',
  textLengthMessage: 'Se requiere %length caracteres',
  maxLengthMessage: 'Se requiere %max o menos caracteres',
  minLengthMessage: 'Se requiere %min o más caracteres',
  rangeLengthMessage: 'El texto debe contener entre %min a %max caracteres',
  reMessage: 'El valor no coincide con la expresión regular %regExp',
  requiredMessage: 'Requerido',
  compareMessage: 'No coinciden',
  numberMessage: 'No es un número',
  notContainMessage: 'No se admiten los siguientes caracteres %alphabet',
  shouldOnlyContainMessage: 'Solo se admiten los siguientes caracteres %alphabet',
  mustContainOneMessage: 'Se requiere al menos uno de los siguientes caracteres: %alphabet',
  mustContainMinMessage: 'Se requiere al menos %min de los siguientes caracteres: %alphabet',
  minValueMessage: 'El valor no puede ser menor a %min',
  maxValueMessage: 'El valor no puede ser mayor a %max',
  rangeValueMessage: 'El valor debe estar entre %min y %max',
  numberPatternMessage: 'No coincide con el patrón %pattern',
});

export default messageEs;
