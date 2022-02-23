import { AuthenticationErrror, AuthorizationError, InternalServerError, NotFoundError, ValidationError } from "Types/errors"
import * as yup from "yup"
import { Router as Router, Method } from "tiny-request-router"
import { Handler, localDevOrigin } from "Types/router"
import { User, AppApprover, AppUser } from "Types/user"

export const handleRoutes = async (router: Router<Handler>, request: Request) => {
  const { pathname } = new URL(request.url)
  let response: Response | null = null

  const match = router.match(request.method as Method, pathname)
  if (match) {
    response = await match.handler(match.params, request)
  }

  if (!response) {
    response = new Response("NOT FOUND", { status: 404 })
  }

  if (MODE === "dev") {
    // Add CORS headers for local development
    response.headers.set("Access-Control-Allow-Origin", localDevOrigin)
    response.headers.set("Vary", "Origin")
  }

  return response
}

export const isAdmin = (user: User) => {
  return user.roles.includes(AppApprover)
}

export const toFormData = (data: any): string => {
  const result = Object.keys(data)
    .map((key) => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
    })
    .join("&")
  return result
}

export const validateReqSchema = async <TOut>(schema: yup.ObjectSchema<any>, request: Request): Promise<TOut> => {
  try {
    const parsedRequest = await request.json()
    const validatedRequest = await schema.validate(parsedRequest, {
      abortEarly: false,
      stripUnknown: true,
    }) // Report all validation errors, Strip unknown keys
    return validatedRequest as any // Return stripped object
  } catch (error: any) {
    throw new ValidationError(error.errors)
  }
}

export const validateResSchema = async (schema: yup.ObjectSchema<any>, response: any) => {
  try {
    await schema.validate(response)
  } catch (error: any) {
    console.log(error.errors)
    throw new InternalServerError(error.errors)
  }
}

export const handleError = (error: Error): Response => {
  let statusCode = 500

  if (error instanceof InternalServerError) statusCode = 500
  if (error instanceof AuthenticationErrror) statusCode = 401
  if (error instanceof AuthorizationError) statusCode = 403
  if (error instanceof ValidationError) statusCode = 400
  if (error instanceof NotFoundError) statusCode = 404

  const customError = {
    message: error.message,
    statusCode: statusCode,
  }

  return new Response(JSON.stringify(customError), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": localDevOrigin,
    },
    status: statusCode,
  })
}
