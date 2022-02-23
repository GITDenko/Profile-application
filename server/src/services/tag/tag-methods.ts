import { Tag } from "types/tags"
import { apiClient } from "util/api-client"
import * as enumService from "types/enum-service/enumTypes"
import { ValidationError } from "yup"
import * as entityService from "services/entity"

export const getTags = async (Type: string, SearchParam: string): Promise<Tag[]> => {
  const url = new URL(TABLE_URL + SAS_TOKEN + `&$filter=PartitionKey eq \'${enumService.EnumEntity.PartitionKey}\' and RowKey gt \'${Type}\' and RowKey lt \'${SearchParam}\'`)
  const tags: Tag = await apiClient.get(url.toString())
  return tags.value
}

export const addTag = async (tag: Tag, Type: string, SearchParam: string): Promise<Response> => {
  await checkDuplicateTag(Type, tag, SearchParam)
  const id = await entityService.generateEntityId(Type, tag)
  const URLParams = `(PartitionKey=\'${enumService.EnumEntity.PartitionKey}\',RowKey=\'${Type}_${id}\')`
  tag.id = Number(id)
  const url = new URL(TABLE_URL + URLParams + SAS_TOKEN)
  tag.modifiedDate = new Date()
  await apiClient.put(url.toString(), { body: JSON.stringify(tag) })
  return new Response(`${Type} succesfully Created`)
}

export const updateTag = async (tag: Tag, Type: string): Promise<Response> => {
  const URLParams = `(PartitionKey=\'${enumService.EnumEntity.PartitionKey}\',RowKey=\'${Type}_${tag.id}\')`
  const url = new URL(TABLE_URL + URLParams + SAS_TOKEN)
  tag.modifiedDate = new Date()
  await apiClient.put(url.toString(), { body: JSON.stringify(tag) })
  return new Response(tag.toString())
}

export const deleteTag = async (id: number, Type: string): Promise<Response> => {
  const URLParams = `(PartitionKey=\'${enumService.EnumEntity.PartitionKey}\',RowKey=\'${Type}_${id}\')`
  const url = new URL(TABLE_URL + URLParams + SAS_TOKEN)
  await apiClient.del(url.toString(), { headers: { "If-Match": "*" } })
  return new Response()
}

// TODO create entity service or similar
// TODO create generic FIND method for future methods (Find Profile/tag/education etc by id)

export const checkDuplicateTag = async (Type: string, tag: Tag, SearchParam: string): Promise<void> => {
  const nameConvert = encodeURIComponent(tag.name)
  const PARAM = `&$filter=PartitionKey eq \'${enumService.EnumEntity.PartitionKey}\' and RowKey gt \'${Type}_\' and RowKey lt \'${SearchParam}\' and name eq \'${nameConvert}\'`
  const url = new URL(TABLE_URL + SAS_TOKEN + PARAM)
  const foundTag: any = await apiClient.get(url.toString())
  if (foundTag.value.length > 0) {
    console.log(`${Type} already Exists`)
    throw new ValidationError(`${Type} already Exists`)
  }
}
