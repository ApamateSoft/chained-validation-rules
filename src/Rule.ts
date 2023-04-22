export default class Rule {
  constructor(readonly message: string, readonly validate: (evaluate: string) => boolean) {}
}
