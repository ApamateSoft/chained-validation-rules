export default class InvalidEvaluationError extends Error {
  constructor(public readonly message: string, public readonly evaluate?: string | null) {
    super(message);
  }
}
