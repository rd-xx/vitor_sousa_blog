/* eslint-disable max-classes-per-file */
import { HTTP_ERRORS } from "@/lib/api/constants"

export class PublicError extends Error {}

export class HttpPublicError extends PublicError {
  statusCode = HTTP_ERRORS.INTERNAL_SERVER_ERROR
}

export class HttpNotFoundError extends HttpPublicError {
  statusCode = HTTP_ERRORS.NOT_FOUND

  constructor(message = "Not found") {
    super(message)
  }
}

export class HttpDuplicateError extends HttpPublicError {
  statusCode = HTTP_ERRORS.DUPLICATE

  constructor(resource: string, key: string, value: string) {
    super(
      !resource
        ? "Resource already exists"
        : `Duplicated resource ${resource} on \`${key}\`=\`${value}\``,
    )
  }
}

export class HttpArgumentsError extends HttpPublicError {
  statusCode = HTTP_ERRORS.UNPROCESSABLE_ENTITY

  constructor(errors?: string[]) {
    super(errors?.join(", ") || "Invalid arguments")
  }
}

export class HttpAuthenticationError extends HttpPublicError {
  statusCode = HTTP_ERRORS.UNAUTHORIZED

  constructor(message = "Invalid credentials") {
    super(message)
  }
}

export class HttpForbiddenError extends HttpPublicError {
  statusCode = HTTP_ERRORS.FORBIDDEN

  constructor(message = "Forbidden") {
    super(message)
  }
}
