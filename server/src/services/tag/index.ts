import { Role, Skill } from "types/tags"
import * as enumService from "types/enum-service/enumTypes"
import * as tagMethods from "./tag-methods"

export const getAllRoles = async (): Promise<Role[]> => {
  return await tagMethods.getTags(enumService.EnumTags.Role, enumService.EnumEntity.RoleSearch)
}

export const addRole = async (role: Role): Promise<Response> => {
  return await tagMethods.addTag(role, enumService.EnumTags.Role, enumService.EnumEntity.RoleSearch)
}

export const updateRole = async (role: Role): Promise<Response> => {
  return await tagMethods.updateTag(role, enumService.EnumTags.Role)
}

export const deleteRole = async (id: number): Promise<Response> => {
  return await tagMethods.deleteTag(id, enumService.EnumTags.Role)
}

export const getAllSkills = async (): Promise<Skill[]> => {
  return await tagMethods.getTags(enumService.EnumTags.Skill, enumService.EnumEntity.SkillSearch)
}

export const addSkill = async (skill: Skill): Promise<Response> => {
  return await tagMethods.addTag(skill, enumService.EnumTags.Skill, enumService.EnumEntity.SkillSearch)
}

export const updateSkill = async (skill: Skill): Promise<Response> => {
  return await tagMethods.updateTag(skill, enumService.EnumTags.Skill)
}

export const deleteSkill = async (id: number): Promise<Response> => {
  return await tagMethods.deleteTag(id, enumService.EnumTags.Skill)
}
