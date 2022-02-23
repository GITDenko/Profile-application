import { handleError, handleRoutes, validateResSchema } from "Util/"
import { authorize } from "Services/auth"
import { userResSchema } from "Types/user"
import { Router, Params } from "tiny-request-router"

const getUser = async (params: Params, request: Request): Promise<Response> => {
  const { user } = await authorize(request)

  await validateResSchema(userResSchema, user)

  return new Response(JSON.stringify(user), {
    headers: { "Content-Type": "application/json" },
  })
}

export const requestHandler = async (params: Params, request: Request): Promise<Response> => {
  const r = new Router()

  try {
    r.get("/api/auth/me", getUser)

    return await handleRoutes(r, request)
  } catch (error: any) {
    return handleError(error)
  }
}
