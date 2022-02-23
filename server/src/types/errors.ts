export class AppError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = this.constructor.name
  }
}

export class AuthenticationErrror extends AppError {}
export class AuthorizationError extends Error {}
export class ValidationError extends Error {}
export class InternalServerError extends Error {}
export class NotFoundError extends Error {}