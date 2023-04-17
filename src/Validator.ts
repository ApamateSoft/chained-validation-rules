import Rule from "./Rule";

export default class Validator {

  // private readonly rules: Rule[] = [];
  // onInvalidEvaluation?: (message: string) => void;

  constructor(
    private readonly rules: Rule[] = [],
    private onInvalidEvaluation?: (message: string) => void
  ) {
  }

  isValid(evaluate: string): boolean {
    for (let rule of this.rules) {
      if (!rule.validate(evaluate)) {
        this.onInvalidEvaluation?.(rule.message)
        return false
      }
    }
    return true
  }

  addOnInvalidEvaluation(cb: (message: string) => void) {
    this.onInvalidEvaluation = cb
  }

  rule(message: string, validate: (evaluate: string) => boolean) {
    this.rules.push(new Rule(message, validate))
  }

}