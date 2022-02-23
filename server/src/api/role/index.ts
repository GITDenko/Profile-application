import { authorize } from "Services/auth"
import * as tagService from "Services/tag"
import { Params, Router } from "tiny-request-router"
import { Role, roleRequestSchema } from "types/tags"
import { handleError, handleRoutes, isAdmin, validateReqSchema } from "Util"

export const getRoles = async (params: Params, request: Request): Promise<Response> => {
  await authorize(request)
  try {
    const roles: Role[] = await tagService.getAllRoles()
    return new Response(JSON.stringify(roles))
  } catch (err: any) {
    return new Response(err, { status: 500 })
  }
}

const addRole = async (params: Params, request: Request): Promise<Response> => {
  const { user } = await authorize(request)
  if (!isAdmin(user)) {
    return new Response("", { status: 403 })
  }
  const role: Role = await validateReqSchema<Role>(roleRequestSchema, request)
  try {
    return await tagService.addRole(role)
  } catch (err: any) {
    return new Response(err, { status: 500 })
  }
}

const updateRole = async (params: Params, request: Request): Promise<Response> => {
  const { user } = await authorize(request)
  if (!isAdmin(user)) {
    return new Response("", { status: 403 })
  }
  const role: Role = await validateReqSchema<Role>(roleRequestSchema, request)
  try {
    return await tagService.updateRole(role)
  } catch (err: any) {
    return new Response(err, { status: 500 })
  }
}

const deleteRole = async (params: Params, request: Request): Promise<Response> => {
  const { user } = await authorize(request)
  if (!isAdmin(user)) {
    return new Response("", { status: 403 })
  }
  try {
    return await tagService.deleteRole(Number(params.id))
  } catch (err: any) {
    return new Response(err, { status: 500 })
  }
}

export const requestHandler = async (params: Params, request: Request): Promise<Response> => {
  type Handler = (params: Params, request: Request) => Promise<Response>
  const r = new Router<Handler>()
  try {
    r.get("/api/role/", getRoles)
    r.post("/api/role/", addRole)
    r.put("/api/role/", updateRole)
    r.delete("/api/role/:id", deleteRole)

    return handleRoutes(r, request)
  } catch (error: any) {
    return handleError(error)
  }
}
