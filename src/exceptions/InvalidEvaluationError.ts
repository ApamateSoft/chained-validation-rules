export default class InvalidEvaluationError extends Error {
  constructor(public readonly message: string, public readonly key: string, public readonly value?: string | null) {
    super(message);

    Object.setPrototypeOf(this, InvalidEvaluationError.prototype);
  }
}
