import { Params, Router } from "tiny-request-router"
import { handleError, handleRoutes, isAdmin } from "Util"
import { authorize } from "Services/auth"
import * as imageService from "Services/image"

// To keep for now due to testing purposes
const getImageById = async (params: Params, request: Request): Promise<Response> => {
  await authorize(request)
  try {
    return await imageService.getImageById(params.imageId)
  } catch (err: any) {
    return new Response(err, { status: 500 })
  }
}

const addImageToProfile = async (params: Params, request: Request): Promise<Response> => {
  const { user } = await authorize(request)
  if (!isAdmin(user)) {
    return new Response("", { status: 403 })
  }
  try {
    return await imageService.addImageToProfile(params.imageId, request.body)
  } catch (err: any) {
    return new Response(err, { status: 500 })
  }
}

const updateImageToProfile = async (params: Params, request: Request): Promise<Response> => {
  const { user } = await authorize(request)
  if (!isAdmin(user)) {
    return new Response("", { status: 403 })
  }
  try {
    return await imageService.updateImageToProfile(params.imageId, request.body)
  } catch (err: any) {
    return new Response(err, { status: 500 })
  }
}

const deleteImageFromProfile = async (params: Params, request: Request): Promise<Response> => {
  const { user } = await authorize(request)
  if (!isAdmin(user)) {
    return new Response("", { status: 403 })
  }
  try {
    return await imageService.deleteImageFromProfile(params.imageId)
  } catch (err: any) {
    return new Response(err, { status: 500 })
  }
}

export const requestHandler = async (params: Params, request: Request): Promise<Response> => {
  type Handler = (params: Params, request: Request) => Promise<Response>
  const r = new Router<Handler>()

  try {
    r.get("/api/image/:imageId", getImageById)
    r.post("/api/image/:imageId", addImageToProfile)
    r.put("/api/image/:imageId", updateImageToProfile)
    r.delete("/api/image/:imageId", deleteImageFromProfile)

    return handleRoutes(r, request)
  } catch (error: any) {
    return handleError(error)
  }
}
