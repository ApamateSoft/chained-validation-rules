import Rule from "./Rule";
import Validator from "./Validator";

export default class ValidatorBuilder {

  constructor(
    private readonly rules: Rule[] = [],
    private onInvalidEvaluation?: (message: string) => void
  ) {
  }

  addOnInvalidEvaluation(cb: (message: string) => void): ValidatorBuilder {
    this.onInvalidEvaluation = cb
    return this;
  }

  rule(message: string, validate: (evaluate: string) => boolean): ValidatorBuilder {
    this.rules.push(new Rule(message, validate))
    return this
  }

  build(): Validator {
    return new Validator(this.rules, this.onInvalidEvaluation)
  }

}