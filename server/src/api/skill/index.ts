import { handleError, handleRoutes, isAdmin, validateReqSchema } from "Util"
import { Skill, skillRequestSchema } from "types/tags"
import { authorize } from "Services/auth"
import { Params, Router } from "tiny-request-router"
import * as tagService from "Services/tag"

const getSkills = async (params: Params, request: Request): Promise<Response> => {
  await authorize(request)
  try {
    const skills: Skill[] = await tagService.getAllSkills()
    return new Response(JSON.stringify(skills))
  } catch (err: any) {
    return new Response(err, { status: 500 })
  }
}

const addSkill = async (params: Params, request: Request): Promise<Response> => {
  const { user } = await authorize(request)
  if (!isAdmin(user)) {
    return new Response("", { status: 403 })
  }
  const skill: Skill = await validateReqSchema<Skill>(skillRequestSchema, request)
  try {
    return await tagService.addSkill(skill)
  } catch (err: any) {
    return new Response(err, { status: 500 })
  }
}

const updateSkill = async (params: Params, request: Request): Promise<Response> => {
  const { user } = await authorize(request)
  if (!isAdmin(user)) {
    return new Response("", { status: 403 })
  }
  const skill: Skill = await validateReqSchema<Skill>(skillRequestSchema, request)
  try {
    return await tagService.updateSkill(skill)
  } catch (err: any) {
    return new Response(err, { status: 500 })
  }
}

const deleteSkill = async (params: Params, request: Request): Promise<Response> => {
  const { user } = await authorize(request)
  if (!isAdmin(user)) {
    return new Response("", { status: 403 })
  }
  try {
    return await tagService.deleteSkill(Number(params.id))
  } catch (err: any) {
    return new Response(err, { status: 500 })
  }
}

export const requestHandler = async (params: Params, request: Request): Promise<Response> => {
  type Handler = (params: Params, request: Request) => Promise<Response>
  const r = new Router<Handler>()
  try {
    r.get("/api/skill/", getSkills)
    r.post("/api/skill/", addSkill)
    r.put("/api/skill/", updateSkill)
    r.delete("/api/skill/:id", deleteSkill)

    return handleRoutes(r, request)
  } catch (error: any) {
    return handleError(error)
  }
}
