import { Params, Router } from "tiny-request-router"
import { handleError, handleRoutes, isAdmin, validateReqSchema, validateResSchema } from "Util"
import { authorize } from "Services/auth"
import * as profileService from "Services/profile"
import { Profile, profileSchema } from "types/profile"

const getProfiles = async (params: Params, request: Request): Promise<Response> => {
  await authorize(request)
  try {
    return new Response(JSON.stringify(await profileService.getAllProfiles()))
  } catch (err: any) {
    return new Response(err, { status: 500 })
  }
}

// To keep for now due to testing purposes
const getProfileById = async (params: Params, request: Request): Promise<Response> => {
  await authorize(request)
  try {
    return new Response(JSON.stringify(await profileService.getProfileById(params.id)))
  } catch (err: any) {
    return new Response(err, { status: 500 })
  }
}

const addProfile = async (params: Params, request: Request): Promise<Response> => {
  const { user } = await authorize(request)
  if (!isAdmin(user)) {
    return new Response("", { status: 403 })
  }
  const profile: Profile = await validateReqSchema<Profile>(profileSchema, request)
  try {
    return await profileService.addProfile(profile)
  } catch (err: any) {
    return new Response(err, { status: 500 })
  }
}

const updateProfile = async (params: Params, request: Request): Promise<Response> => {
  const { user } = await authorize(request)
  if (!isAdmin(user)) {
    return new Response("", { status: 403 })
  }
  const profile: Profile = await validateReqSchema<Profile>(profileSchema, request)
  try {
    return await profileService.updateProfile(profile)
  } catch (err: any) {
    return new Response(err, { status: 500 })
  }
}

const deleteProfile = async (params: Params, request: Request): Promise<Response> => {
  const { user } = await authorize(request)
  if (!isAdmin(user)) {
    return new Response("", { status: 403 })
  }
  try {
    return await profileService.deleteProfile(String(params.id))
  } catch (err: any) {
    return new Response(err, { status: 500 })
  }
}

export const requestHandler = async (params: Params, request: Request): Promise<Response> => {
  type Handler = (params: Params, request: Request) => Promise<Response>
  const r = new Router<Handler>()

  try {
    r.delete("/api/profile/:id", deleteProfile)
    r.get("/api/profile/", getProfiles)
    r.get("/api/profile/:id", getProfileById)
    r.post("/api/profile/", addProfile)
    r.put("/api/profile/", updateProfile)

    return handleRoutes(r, request)
  } catch (error: any) {
    return handleError(error)
  }
}
