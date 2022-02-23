import { NotFoundError } from "Types/errors"
import { apiClient } from "Util/api-client"

export const getImageById = async (id: string): Promise<Response> => {
  const url = new URL(BLOB_URL + id + SAS_TOKEN)
  const resp: Response = await fetch(url.toString())
  if (resp.headers.get("x-ms-error-code") === "BlobNotFound") {
    throw new NotFoundError("No such image " + id)
  }
  return new Response(resp.body, resp)
}

export const addOrUpdateImage = async (blobId: string, mimeType: string, body: BodyInit | null): Promise<Response> => {
  const url = new URL(BLOB_URL + blobId + SAS_TOKEN)
  await apiClient.put(url.toString(), {
    headers: {
      "x-ms-blob-type": "BlockBlob",
      "Content-Type": mimeType,
    },
    body: body,
  })

  return new Response("Image uploaded succesfully")
}
export const deleteImage = async (blobId: string, mimeType: string): Promise<Response> => {
  const url = new URL(BLOB_URL + blobId + SAS_TOKEN)
  await apiClient.del(url.toString(), {
    headers: {
      "x-ms-blob-type": "BlockBlob",
      "Content-Type": mimeType,
    },
  })
  return new Response("Image Deleted succesfully")
}
