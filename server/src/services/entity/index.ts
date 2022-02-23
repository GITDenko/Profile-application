import * as enumService from "types/enum-service/enumTypes"
import { NotFoundError } from "Types/errors"
import { Profile } from "types/profile"
import { apiClient } from "util/api-client"
import { ValidationError } from "yup"

export const generateEntityId = async (Type: string, object: any): Promise<string | number> => {
  if (Type === "Profile") {
    const profile: Profile = object
    await checkDuplicateProfile(profile, Type)
    return `${Type}_${profile.lastName}_${profile.firstName}`
  } else {
    const id = await findNextId(Type)
    return Number(id)
  }
}

export const stringifyObjects = async (entity: any): Promise<Response> => {
  let stringifiedEntity: any = {}
  for (var prop in entity) {
    if (prop === "roles" || prop === "skills" || prop === "educations" || prop === "experiences" || prop === "period") {
      stringifiedEntity[prop] = JSON.stringify(entity[prop])
      continue
    }
    stringifiedEntity[prop] = entity[prop]
  }
  return stringifiedEntity
}

// TODO inherit possible generate Random Id instead of number
const findNextId = async (Type: string): Promise<number | null> => {
  for (let i: number = 1; i < Number.MAX_VALUE; i++) {
    const url = new URL(
      TABLE_URL +
        SAS_TOKEN +
        `&$filter=PartitionKey eq \'${enumService.EnumEntity.PartitionKey}\' and RowKey eq \'${Type}_${i}\'`
    )
    const object: any = await apiClient.get(url.toString())
    if (object.value.length === 0) {
      return i
    }
  }
  throw new NotFoundError(`No Id can be found, perhaps deleting older ${Type}s`)
}

const checkDuplicateProfile = async (profile: Profile, Type: string): Promise<void> => {
  const convertedEmail = encodeURIComponent(profile.id)
  const url = new URL(TABLE_URL + SAS_TOKEN + `&$filter=id eq \'${convertedEmail}\'`)
  const foundProfile: Profile = await apiClient.get(url.toString())
  if (foundProfile.value[0]) {
    throw new ValidationError(`${profile.firstName} ${profile.lastName} already has a profile created`)
  }
}
