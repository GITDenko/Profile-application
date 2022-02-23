import { Profile } from "types/profile"
import { apiClient } from "util/api-client"
import * as enumService from "types/enum-service/enumTypes"
import * as entityService from "Services/entity"

export const getAllProfiles = async (Type: string, SearchParam: string): Promise<Profile[]> => {
  const url = new URL(
    TABLE_URL +
      SAS_TOKEN +
      `&$filter=PartitionKey eq \'${enumService.EnumEntity.PartitionKey}\' and RowKey gt \'${Type}\' and RowKey lt \'${SearchParam}\'`
  )
  const profiles: Profile = await apiClient.get(url.toString())
  return profiles.value
}

export const getProfileById = async (id: string, Type: string, SearchParam: string): Promise<Profile[]> => {
  const convertedId = encodeURIComponent(id)
  const url = new URL(
    TABLE_URL +
      SAS_TOKEN +
      `&$filter=PartitionKey eq \'${enumService.EnumEntity.PartitionKey}\' and RowKey gt \'${Type}\' and RowKey lt \'${SearchParam}\' and id eq \'${convertedId}\'`
  )
  const profile: Profile = await apiClient.get(url.toString())
  return profile.value
}

export const addProfile = async (profile: Profile, Type: string): Promise<Response> => {
  const rowKeyId = String(await entityService.generateEntityId(Type, profile))
  const URLParams = `(PartitionKey=\'${enumService.EnumEntity.PartitionKey}\',RowKey=\'${rowKeyId}\')`
  const url = new URL(TABLE_URL + URLParams + SAS_TOKEN)
  profile.modifiedDate = new Date()
  const stringProfile = JSON.stringify(await entityService.stringifyObjects(profile))
  await apiClient.put(url.toString(), { body: stringProfile })
  return new Response(`${Type} added succesfully`)
}

export const updateProfile = async (profile: Profile, Type: string): Promise<Response> => {
  const URLParams = `(PartitionKey=\'${enumService.EnumEntity.PartitionKey}\',RowKey=\'${Type}_${profile.lastName}_${profile.firstName}\')`
  const url = new URL(TABLE_URL + URLParams + SAS_TOKEN)
  profile.modifiedDate = new Date()
  const stringProfile = JSON.stringify(await entityService.stringifyObjects(profile))
  await apiClient.put(url.toString(), { body: stringProfile })
  return new Response(`${Type} updated succesfully`)
}

export const deleteProfile = async (id: string, Type: string): Promise<Response> => {
  const URLParams = `(PartitionKey=\'${enumService.EnumEntity.PartitionKey}\',RowKey=\'${Type}_${id}\')`
  const url = new URL(TABLE_URL + URLParams + SAS_TOKEN)
  await apiClient.del(url.toString(), { headers: { "If-Match": "*" } })
  return new Response(`${Type} Succesfully Deleted`)
}
