import * as profileMethods from "./profile-methods"
import * as enumService from "types/enum-service/enumTypes"
import { Profile } from "types/profile"

export const getAllProfiles = async (): Promise<Profile[]> => {
  return profileMethods.getAllProfiles(enumService.EnumType.Profile, enumService.EnumEntity.ProfileSearch)
}

export const getProfileById = async (id: string): Promise<Profile[]> => {
  return profileMethods.getProfileById(id, enumService.EnumType.Profile, enumService.EnumEntity.ProfileSearch)
}

export const addProfile = async (profile: Profile): Promise<Response> => {
  return profileMethods.addProfile(profile, enumService.EnumType.Profile)
}

export const updateProfile = async (profile: Profile): Promise<Response> => {
  return profileMethods.updateProfile(profile, enumService.EnumType.Profile)
}

export const deleteProfile = async (id: string): Promise<Response> => {
  return profileMethods.deleteProfile(id, enumService.EnumType.Profile)
}
